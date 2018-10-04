import * as React from 'react';
import styles from './CosmodbPerfmon.module.scss';
import { ICosmodbPerfmonProps } from './ICosmodbPerfmonProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { autobind } from '@uifabric/utilities';
import Highcharts from 'highcharts/highstock';
import HC_map from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';


// init the module
HC_map(Highcharts);



export default class CosmodbPerfmon extends React.Component<ICosmodbPerfmonProps, {}> {

  private myPromise : Promise<any>;

  @autobind
  public componentDidMount(): void {
    //
    //

    // this.myPromise = this.setAndgetData()
    // .then (x =>  {
    //   //  set state
    //   console.log("set state here...");
    //   });
    }



  public render(): React.ReactElement<ICosmodbPerfmonProps> {

    let options2 = {
      chart: {
        type: 'bar'
        },
        title: {
          text: 'Response Times (without Multi-Master): Cosmos DB vs User Profile DB'
        },
        xAxis: {
          categories: ['User Profile DB','Cosmos DB (eastus)','Cosmos DB (westus)','Cosmos DB (westeurope)','Cosmos DB (japaneast)']
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
          name: 'Traffic Manager - GET',
          data: [0,this.props.durations.durationTrafficManager.duration, this.props.durations.durationTrafficManager.duration,this.props.durations.durationTrafficManager.duration, this.props.durations.durationTrafficManager.duration],
          stack: 'GET',
          color: "#A0A0A0"
        },
        {
          name: 'Traffic Manager - POST',
          data: [0,this.props.durations.durationTrafficManager.duration, this.props.durations.durationTrafficManager.duration,this.props.durations.durationTrafficManager.duration, this.props.durations.durationTrafficManager.duration],
          stack: 'POST',
          color: "#A0A0A0",
          dataLabels: {enabled:false}
        }]
      };

      return (
        <div className={ styles.cosmodbPerfmon }>
          <HighchartsReact highcharts={Highcharts} options={options2}/>
          <p>(Traffic Manager recommended Web API = {this.props.durations.durationTrafficManager.webapp_uri})</p>
        </div>
      );
    }
  }
