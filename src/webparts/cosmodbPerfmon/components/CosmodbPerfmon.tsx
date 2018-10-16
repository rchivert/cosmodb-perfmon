import * as React from 'react';
import styles from './CosmodbPerfmon.module.scss';
import { ICosmodbPerfmonProps } from './ICosmodbPerfmonProps';

import { autobind } from '@uifabric/utilities';
import Highcharts from 'highcharts/highstock';
import HC_map from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';


// init the module
HC_map(Highcharts);

export default class CosmodbPerfmon extends React.Component<ICosmodbPerfmonProps, {}> {

  private myPromise : Promise<any>;

  public render(): React.ReactElement<ICosmodbPerfmonProps> {

    const colorUPSGET    = "#EDFFAB";
    const colorUPSPOST   = "#7ea16b";

    const colorAzureGETConsumption    = "#59B4FF";
    const colorAzureGETAppservice     = "#0A74CC";

    const colorAzurePOSTConsumption   = "#c0aca5";
    const colorAzurePOSTAppservice    = "#8d7b76";

    const colorCOSMOS     = "3d3a45";
    const borderWidth     = 0;
    const borderColor     = "red";

    const showInLegend    = false;



    const optionsHighChart = {
      chart: {
        type: 'bar',
        borderColor: '#E6F2FF',
        borderWidth: 1,
        height: 800
        },
        title: {
          text: 'Cosmos DB Azure Region Response Times vs User Profile Service'
        },
        xAxis: {
          categories: ['User Profile DB','Cosmos DB (eastus)','Cosmos DB (westus)','Cosmos DB (westeurope)','Cosmos DB (japaneast)','Cosmos DB (brazilsouth)','Cosmos DB (australiaeast)','Cosmos DB (southindia)']
      },
      yAxis: {
          title: {
              text: 'Milliseconds'
          }
      },
      legend: {
        reversed: true
        },
      plotOptions: {
        series: {
            stacking: 'normal'
          }
        },
        series: [{
          name: 'User Profile - GET',
          data: [this.props.durations.durationUserProfile.duration_function_get],
          stack: '1',
          color: colorUPSGET,
          borderWidth: 1,
          borderColor: 'black',
          showInLegend: showInLegend
        },
        {
          name: 'User Profile - POST',
          data: [this.props.durations.durationUserProfile.duration_function_post],
          stack: '2',
          color: colorUPSPOST,
          borderWidth: 1,
          borderColor: 'black',
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (useast - consumption)',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_cosmos_get,0],
          stack: '1',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (useast - consumption)',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_function_get,0],
          stack: '1',
          color: colorAzureGETConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzureGETConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (useast - appservice)',
          data: [0,this.props.durations.durationWebApp2EASTUS.duration_cosmos_get,0],
          stack: '2',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (useast - appservice)',
          data: [0,this.props.durations.durationWebApp2EASTUS.duration_function_get,0],
          stack: '2',
          color: colorAzureGETAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (useast - consumption)',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_cosmos_post,0],
          stack: '3',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (useast - consumption)',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_function_post,0],
          stack: '3',
          color: colorAzurePOSTConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzurePOSTConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (useast - appservice)',
          data: [0,this.props.durations.durationWebApp2EASTUS.duration_cosmos_post,0],
          stack: '4',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (useast - appservice)',
          data: [0,this.props.durations.durationWebApp2EASTUS.duration_function_post,0],
          stack: '4',
          color: colorAzurePOSTAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (uswest - consumption)',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_cosmos_get],
          stack: '1',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (uswest - consumption)',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_function_get],
          stack: '1',
          color: colorAzureGETConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzureGETConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (uswest - appservice)',
          data: [0,0,this.props.durations.durationWebApp2WESTUS.duration_cosmos_get],
          stack: '2',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (uswest - appservice)',
          data: [0,0,this.props.durations.durationWebApp2WESTUS.duration_function_get],
          stack: '2',
          color: colorAzureGETAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (uswest - consumption)',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_cosmos_post],
          stack: '3',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (uswest - consumption)',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_function_post],
          stack: '3',
          color: colorAzurePOSTConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzurePOSTConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (uswest - appservice)',
          data: [0,0,this.props.durations.durationWebApp2WESTUS.duration_cosmos_post],
          stack: '4',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (uswest - appservice)',
          data: [0,0,this.props.durations.durationWebApp2WESTUS.duration_function_post],
          stack: '4',
          color: colorAzurePOSTAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (westeurope - consumption)',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_cosmos_get],
          stack: '1',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (westeurope - consumption)',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_function_get],
          stack: '1',
          color: colorAzureGETConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzureGETConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (westeurope - appservice)',
          data: [0,0,0,this.props.durations.durationWebApp2WESTEUROPE.duration_cosmos_get],
          stack: '2',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (westeurope - appservice)',
          data: [0,0,0,this.props.durations.durationWebApp2WESTEUROPE.duration_function_get],
          stack: '2',
          color: colorAzureGETAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (westeurope - consumption)',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_cosmos_post],
          stack: '3',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (westeurope - consumption)',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_function_post],
          stack: '3',
          color: colorAzurePOSTConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzurePOSTConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (westeurope - appservice)',
          data: [0,0,0,this.props.durations.durationWebApp2WESTEUROPE.duration_cosmos_post],
          stack: '4',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (westeurope - appservice)',
          data: [0,0,0,this.props.durations.durationWebApp2WESTEUROPE.duration_function_post],
          stack: '4',
          color: colorAzurePOSTAppservice,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (japaneast - consumption)',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_cosmos_get],
          stack: '1',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (japaneast - consumption)',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_function_get],
          stack: '1',
          color: colorAzureGETConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzureGETConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (japaneast - appservice)',
          data: [0,0,0,0,this.props.durations.durationWebApp2JAPANEAST.duration_cosmos_get],
          stack: '2',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (japaneast - appservice)',
          data: [0,0,0,0,this.props.durations.durationWebApp2JAPANEAST.duration_function_get],
          stack: '2',
          color: colorAzureGETAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (japaneast - consumption)',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_cosmos_post],
          stack: '3',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (japaneast - consumption)',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_function_post],
          stack: '3',
          color: colorAzurePOSTConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzurePOSTConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (japaneast - appservice)',
          data: [0,0,0,0,this.props.durations.durationWebApp2JAPANEAST.duration_cosmos_post],
          stack: '4',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (japaneast - appservice)',
          data: [0,0,0,0,this.props.durations.durationWebApp2JAPANEAST.duration_function_post],
          stack: '4',
          color: colorAzurePOSTAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (brazilsouth - consumption)',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_cosmos_get],
          stack: '1',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (brazilsouth - consumption)',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_function_get],
          stack: '1',
          color: colorAzureGETConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzureGETConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (brazilsouth - appservice)',
          data: [0,0,0,0,0,this.props.durations.durationWebApp2BRAZILSOUTH.duration_cosmos_get],
          stack: '2',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (brazilsouth - appservice)',
          data: [0,0,0,0,0,this.props.durations.durationWebApp2BRAZILSOUTH.duration_function_get],
          stack: '2',
          color: colorAzureGETAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (brazilsouth - consumption)',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_cosmos_post],
          stack: '3',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (brazilsouth - consumption)',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_function_post],
          stack: '3',
          color: colorAzurePOSTConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzurePOSTConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (brazilsouth - appservice)',
          data: [0,0,0,0,0,this.props.durations.durationWebApp2BRAZILSOUTH.duration_cosmos_post],
          stack: '4',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (brazilsouth - appservice)',
          data: [0,0,0,0,0,this.props.durations.durationWebApp2BRAZILSOUTH.duration_function_post],
          stack: '4',
          color: colorAzurePOSTAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (australiaeast - consumption)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_cosmos_get],
          stack: '1',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (australiaeast - consumption)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_function_get],
          stack: '1',
          color: colorAzureGETConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzureGETConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (australiaeast - appservice)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebApp2AUSTRALIAEAST.duration_cosmos_get],
          stack: '2',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (australiaeast - appservice)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebApp2AUSTRALIAEAST.duration_function_get],
          stack: '2',
          color: colorAzureGETAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (australiaeast - consumption)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_cosmos_post],
          stack: '3',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (australiaeast - consumption)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_function_post],
          stack: '3',
          color: colorAzurePOSTConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzurePOSTConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (australiaeast - appservice)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebApp2AUSTRALIAEAST.duration_cosmos_post],
          stack: '4',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (australiaeast - appservice)',
          data: [0,0,0,0,0,0,this.props.durations.durationWebApp2AUSTRALIAEAST.duration_function_post],
          stack: '4',
          color: colorAzurePOSTAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (southindia - consumption)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_cosmos_get],
          stack: '1',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (southindia - consumption)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_function_get],
          stack: '1',
          color: colorAzureGETConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzureGETConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Read (southindia - appservice)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebApp2SOUTHINDIA.duration_cosmos_get],
          stack: '2',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc GET (southindia - appservice)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebApp2SOUTHINDIA.duration_function_get],
          stack: '2',
          color: colorAzureGETAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (southindia - consumption)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_cosmos_post],
          stack: '3',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (southindia - consumption)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_function_post],
          stack: '3',
          color: colorAzurePOSTConsumption,
          borderWidth: borderWidth,
          borderColor: colorAzurePOSTConsumption,
          showInLegend: showInLegend
        },
        {
          name: 'Cosmos Write (southindia - appservice)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebApp2SOUTHINDIA.duration_cosmos_post],
          stack: '4',
          color: colorCOSMOS,
          borderWidth: borderWidth,
          borderColor: colorCOSMOS,
          showInLegend: showInLegend
        },
        {
          name: 'AzFunc POST (southindia - appservice)',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebApp2SOUTHINDIA.duration_function_post],
          stack: '4',
          color: colorAzurePOSTAppservice,
          borderWidth: borderWidth,
          borderColor: borderColor,
          showInLegend: showInLegend
        }]
      };

      return (
        <div className={ styles.cosmodbPerfmon }>
          <HighchartsReact highcharts={Highcharts} options={optionsHighChart}/>
          <div>
            <table>
              <tr>
                <td>(Traffic Manager: recommended Web API = {this.props.durations.durationTrafficManager.webapp_uri}&nbsp;, Initial delay = {this.props.durations.durationTrafficManager.duration} Milliseconds)</td>
                <td><button className="ms-Button ms-button--primary" onClick={this.props.buttonclick}>refresh</button></td>
              </tr>
              </table>
          </div>
        </div>
      );
    }
  }
