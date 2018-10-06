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
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'User Profile - POST',
          data: [this.props.durations.durationUserProfile.duration_function_post],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Cosmos (US East) - Cosmos Read',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_cosmos_get,0],
          stack: 'GET',
          color: "#000000"
        },
        {
          name: 'Cosmos (US East) - Cosmos Write',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_cosmos_post,0],
          stack: 'POST',
          color: "#000000"
        },
        {
          name: 'Cosmos (US East) - AzFunc GET',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_function_get,0],
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'Cosmos (US East) - AzFunc POST',
          data: [0,this.props.durations.durationWebAppEASTUS.duration_function_post,0],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Cosmos (US West) - Cosmos Read',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_cosmos_get],
          stack: 'GET',
          color: "#000000"
        },
        {
          name: 'Cosmos (US West) - Cosmos Write',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_cosmos_post],
          stack: 'POST',
          color: "#000000"
        },
        {
          name: 'Cosmos (US West) - AzFunc GET',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_function_get],
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'Cosmos (US West) - AzFunc POST',
          data: [0,0,this.props.durations.durationWebAppWESTUS.duration_function_post],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Cosmos (West Europe) - Cosmos Read',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_cosmos_get],
          stack: 'GET',
          color: "#000000"
        },
        {
          name: 'Cosmos (West Europe) - Cosmos Write',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_cosmos_post],
          stack: 'POST',
          color: "#000000"
        },
        {
          name: 'Cosmos (West Europe) - AzFunc GET',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_function_get],
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'Cosmos (West Europe) - AzFunc POST',
          data: [0,0,0,this.props.durations.durationWebAppWESTEUROPE.duration_function_post],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Cosmos (Japan East) - Cosmos Read',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_cosmos_get],
          stack: 'GET',
          color: "#000000"
        },
        {
          name: 'Cosmos (Japan East) - Cosmos Write',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_cosmos_post],
          stack: 'POST',
          color: "#000000"
        },
        {
          name: 'Cosmos (Japan East) - AzFunc GET',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_function_get],
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'Cosmos (Japan East) - AzFunc POST',
          data: [0,0,0,0,this.props.durations.durationWebAppJAPANEAST.duration_function_post],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Cosmos (Brazil South) - Cosmos Read',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_cosmos_get],
          stack: 'GET',
          color: "#000000"
        },
        {
          name: 'Cosmos (Brazil South) - Cosmos Write',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_cosmos_post],
          stack: 'POST',
          color: "#000000"
        },
        {
          name: 'Cosmos (Brazil South) - AzFunc GET',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_function_get],
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'Cosmos (Brazil South) - AzFunc POST',
          data: [0,0,0,0,0,this.props.durations.durationWebAppBRAZILSOUTH.duration_function_post],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Cosmos (Australia East) - Cosmos Read',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_cosmos_get],
          stack: 'GET',
          color: "#000000"
        },
        {
          name: 'Cosmos (Australia East) - Cosmos Write',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_cosmos_post],
          stack: 'POST',
          color: "#000000"
        },
        {
          name: 'Cosmos (Australia East) - AzFunc GET',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_function_get],
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'Cosmos (Australia East) - AzFunc POST',
          data: [0,0,0,0,0,0,this.props.durations.durationWebAppAUSTRALIAEAST.duration_function_post],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Cosmos (South India) - Cosmos Read',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_cosmos_get],
          stack: 'GET',
          color: "#000000"
        },
        {
          name: 'Cosmos (South India) - Cosmos Write',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_cosmos_post],
          stack: 'POST',
          color: "#000000"
        },
        {
          name: 'Cosmos (South India) - AzFunc GET',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_function_get],
          stack: 'GET',
          color: "#66B2FF"
        },
        {
          name: 'Cosmos (South India) - AzFunc POST',
          data: [0,0,0,0,0,0,0,this.props.durations.durationWebAppSOUTHINDIA.duration_function_post],
          stack: 'POST',
          color: "#6666FF"
        },
        {
          name: 'Traffic Manager - GET',
          data: this.props.durations.durationTrafficManager.regionDurations,
          stack: 'GET',
          color: "#A0A0A0"
        },
        {
          name: 'Traffic Manager - POST',
          data: this.props.durations.durationTrafficManager.regionDurations,
          stack: 'POST',
          color: "#A0A0A0",
          dataLabels: {enabled:false}
        }]
      };

      return (
        <div className={ styles.cosmodbPerfmon }>
          <HighchartsReact highcharts={Highcharts} options={optionsHighChart}/>
          <div>
            <table>
              <tr>
                <td>(Traffic Manager recommended Web API = {this.props.durations.durationTrafficManager.webapp_uri})&nbsp;</td>
                <td><button className="ms-Button ms-button--primary" onClick={this.props.buttonclick}>refresh</button></td>
              </tr>
              </table>
          </div>
        </div>
      );
    }
  }
