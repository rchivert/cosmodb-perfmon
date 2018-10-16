import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CosmodbPerfmonWebPartStrings';
import CosmodbPerfmon from './components/CosmodbPerfmon';
import { ICosmodbPerfmonProps, ITrafficManagerData, IAzureFunctionTimingData, IUPSTimingData, IDurations } from './components/ICosmodbPerfmonProps';

import { HttpClientResponse, IHttpClientOptions, HttpClient, AadHttpClient  } from '@microsoft/sp-http';
import { setup as pnpSetup } from "@pnp/common";
import * as datefns from 'date-fns';
import SPUserProfileService from '../../services/SPUserProfileService';

export interface ICosmodbPerfmonWebPartProps {
  description: string;
}

type webAppRegion = "eastus"|"westus" | "japaneast" | "westeurope" | "brazilsouth"| "australiaeast"| "southindia";

const testdata = {
  "id":"user2@domain.com",
  "links":[
          { "title":"title1", "url":"url1"},
          { "title":"title2", "url":"url2"},
          { "title":"title3", "url":"url3"},
          { "title":"title4", "url":"url4"},
          { "title":"title5", "url":"url5"},
          { "title":"title6", "url":"url6"},
          { "title":"title7", "url":"url7"},
          { "title":"title8", "url":"url8"},
          { "title":"title9", "url":"url9"},
          { "title":"title10","url":"url10"}
          ],
  "color": "red"
};

export default class CosmodbPerfmonWebPart extends BaseClientSideWebPart<ICosmodbPerfmonWebPartProps> {

  private myPromise: Promise<any>;

  private aadClientEASTUS : AadHttpClient | undefined;
  private aadClientWESTUS : AadHttpClient | undefined;
  private aadClientWESTEUROPE : AadHttpClient | undefined;
  private aadClientJAPANEAST : AadHttpClient | undefined;
  private aadClientBRAZILSOUTH : AadHttpClient | undefined;
  private aadClientAUSTRALIAEAST : AadHttpClient | undefined;
  private aadClientSOUTHINDIA : AadHttpClient | undefined;

  private aadClient2EASTUS : AadHttpClient | undefined;
  private aadClient2WESTUS : AadHttpClient | undefined;
  private aadClient2WESTEUROPE : AadHttpClient | undefined;
  private aadClient2JAPANEAST : AadHttpClient | undefined;
  private aadClient2BRAZILSOUTH : AadHttpClient | undefined;
  private aadClient2AUSTRALIAEAST : AadHttpClient | undefined;
  private aadClient2SOUTHINDIA : AadHttpClient | undefined;

  private async getTrafficManagerTiming () : Promise<ITrafficManagerData>
  {
    //  Get the most-performant (closest) Azure Function WebApp
    var startedAt = Date.now();
    var tmData = await this.getBestPerformingWebApp();
    var endedAt = Date.now();
    var elapsed = datefns.differenceInMilliseconds(endedAt, startedAt);

    const url = tmData.webapp_uri;

    if (url.length > 0)
      {
      tmData.duration = elapsed ;
      }

    return new Promise<ITrafficManagerData>(resolve => {
      resolve(tmData);
    });
  }

  private async getUserProfileTiming () : Promise<IUPSTimingData>
  {
    let upsTiming : IUPSTimingData;

    try
      {
      let upsService: SPUserProfileService = new SPUserProfileService(this.context);

      // save the personal links in the UPS
      console.log("posting data to UPS");
      let startedAt = Date.now();
      var response = await upsService.setUserProfileProperty("PnP-CollabFooter-MyLinks",'String', JSON.stringify(testdata));
      let endedAt = Date.now();
      let elapsedPost = datefns.differenceInMilliseconds(endedAt, startedAt);

      // retrieve the links from the UPS
      console.log("getting data from UPS");
      startedAt = Date.now();
      let myLinksJson: any = await upsService.getUserProfileProperty("PnP-CollabFooter-MyLinks");
      endedAt = Date.now();
      let elapsedGet = datefns.differenceInMilliseconds(endedAt, startedAt);
      upsTiming = {"duration_function_get": elapsedGet, "duration_function_post":elapsedPost};

       // if we have personalized links
       if ((myLinksJson != null) && (myLinksJson.length > 0))
        {
        var results = JSON.parse(myLinksJson);
        console.log("myLinksJson = " + myLinksJson);
        }
      }
    catch (e)
      {
      console.log (e.message);
      upsTiming = {"duration_function_get": 0, "duration_function_post": 0};
      }

    return new Promise<IUPSTimingData>(resolve => {
      resolve(upsTiming);
    });
  }

  private async getWebAppTiming (region : webAppRegion ) : Promise<IAzureFunctionTimingData>
  {
    let waTiming : IAzureFunctionTimingData;
    let aadClient : AadHttpClient;

    try
      {
      //  Post data to Cosmos DB, and get data from Cosmos DB
      //
      let webapp_appid : string;
      let webapp_uri : string;

      switch (region)
        {
        case "eastus":
          {
          if (this.aadClientEASTUS === undefined)
            {
            webapp_appid = "a9451f9d-7703-41cc-8d7a-fece0fc8e080";
            this.aadClientEASTUS = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClientEASTUS for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences-eastus.azurewebsites.net";
          aadClient = this.aadClientEASTUS;
          break;
          }
        case "japaneast":
          {
          if (this.aadClientJAPANEAST === undefined)
            {
            webapp_appid = "40e47863-43e3-479e-b84f-47fc97d9303a";
            this.aadClientJAPANEAST = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClientJAPANEAST for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences-japaneast.azurewebsites.net";
          aadClient = this.aadClientJAPANEAST;
          break;
          }
        case "westus":
          {
          if (this.aadClientWESTUS === undefined)
            {
            webapp_appid = "9f43acce-2a9c-4e7f-a9f4-806a5c7c8323";
            this.aadClientWESTUS = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClientWESTUS for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences-westus.azurewebsites.net";
          aadClient = this.aadClientWESTUS;
          break;
          }
        case "westeurope":
          {
          if (this.aadClientWESTEUROPE === undefined)
            {
            webapp_appid = "5d86e3db-8f26-47c3-822e-7d8521f5a1ea";
            this.aadClientWESTEUROPE = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClientWESTEUROPE for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences-westeurope.azurewebsites.net";
          aadClient = this.aadClientWESTEUROPE;
          break;
          }
        case "brazilsouth":
          {
          if (this.aadClientBRAZILSOUTH === undefined)
            {
            webapp_appid = "44414382-41c0-461f-ad6d-660379eacb35";
            this.aadClientBRAZILSOUTH = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClientBRAZILSOUTH for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences-brazilsouth.azurewebsites.net";
          aadClient = this.aadClientBRAZILSOUTH;
          break;
          }
        case "australiaeast":
          {
          if (this.aadClientAUSTRALIAEAST === undefined)
            {
            webapp_appid = "a0a0a44b-bbbf-415c-a867-f207d1056cab";
            this.aadClientAUSTRALIAEAST = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClientAUSTRALIAEAST for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences-australiaeast.azurewebsites.net";
          aadClient = this.aadClientAUSTRALIAEAST;
          break;
          }
        case "southindia":
          {
          if (this.aadClientSOUTHINDIA === undefined)
            {
            webapp_appid = "f038cf7a-b008-412f-8840-b25a1fbab6ff";
            this.aadClientSOUTHINDIA = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClientSOUTHINDIA for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences-southindia.azurewebsites.net";
          aadClient = this.aadClientSOUTHINDIA;
          break;
          }
        default:
          {
          throw new Error ('region not implemented');
          }
        }

        // create an AadHttpClient
        //const aadClient: AadHttpClient = await this.context.aadHttpClientFactory.getClient(webapp_appid);
        //console.log("Created aadClient for webapp_id: '" + webapp_appid + "'");

        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append('Cache-Control', 'no-cache');

        const requestOptions: IHttpClientOptions =  {
                                                    headers: requestHeaders,
                                                    body:   JSON.stringify(testdata)
                                                    };

        console.log("posting data to cosmos db at region " + region);
        let startedAt = Date.now();
        let clientPostResponse: HttpClientResponse = await aadClient.post(webapp_uri + '/preferences', AadHttpClient.configurations.v1, requestOptions);
        let endedAt = Date.now();
        let elapsedPost = datefns.differenceInMilliseconds(endedAt, startedAt);
        let txt : string = await clientPostResponse.text();
        let o = txt ? JSON.parse(txt) : {};
        let duration_cosmos_post = o.duration;
        console.log("response from POST = " + txt);

        console.log("getting data from cosmos db at region "+ region);
        startedAt = Date.now();
        let clientGetResponse : HttpClientResponse = await aadClient.get (webapp_uri + '/preferences/user2@domain.com', AadHttpClient.configurations.v1);
        endedAt = Date.now();
        let elapsedGet = datefns.differenceInMilliseconds(endedAt, startedAt);
        txt = await clientGetResponse.text();
        o = txt ? JSON.parse(txt) : {};
        let duration_cosmos_get = o.duration;
        console.log("response from GET = " + txt);

        waTiming = {"duration_function_get":  (elapsedGet  - duration_cosmos_get),
                    "duration_function_post": (elapsedPost - duration_cosmos_post),
                    "duration_cosmos_get":    duration_cosmos_get,
                    "duration_cosmos_post":   duration_cosmos_post
                  };
      }
    catch (e)
      {
      console.log (e.message);
      waTiming =  {"duration_function_get": 0,
          "duration_function_post": 0,
          "duration_cosmos_get": 0,
          "duration_cosmos_post": 0
          };
      }

    return new Promise<IAzureFunctionTimingData>(resolve => {
      resolve(waTiming);
    });
  }

  private async getWebApp2Timing (region : webAppRegion ) : Promise<IAzureFunctionTimingData>
  {
    let waTiming : IAzureFunctionTimingData;
    let aadClient : AadHttpClient;

    try
      {
      //  Post data to Cosmos DB, and get data from Cosmos DB
      //
      let webapp_appid : string;
      let webapp_uri : string;

      switch (region)
        {
        case "eastus":
          {
          if (this.aadClient2EASTUS === undefined)
            {
            webapp_appid = "2b23954e-b97b-41f0-88b7-de47d19fc653";
            this.aadClient2EASTUS = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClient2EASTUS for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences2-eastus.azurewebsites.net";
          aadClient = this.aadClient2EASTUS;
          break;
          }
        case "japaneast":
          {
          if (this.aadClient2JAPANEAST === undefined)
            {
            webapp_appid = "3d326fa7-ef51-4634-8e33-4f0cebe09b3f";
            this.aadClient2JAPANEAST = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClient2JAPANEAST for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences2-japaneast.azurewebsites.net";
          aadClient = this.aadClient2JAPANEAST;
          break;
          }
        case "westus":
          {
          if (this.aadClient2WESTUS === undefined)
            {
            webapp_appid = "93c9dfd4-848a-45a8-8997-9b21302162b5";
            this.aadClient2WESTUS = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClient2WESTUS for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences2-westus.azurewebsites.net";
          aadClient = this.aadClient2WESTUS;
          break;
          }
        case "westeurope":
          {
          if (this.aadClient2WESTEUROPE === undefined)
            {
            webapp_appid = "12d2973c-9945-4c53-ae09-30a79c98d18d";
            this.aadClient2WESTEUROPE = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClient2WESTEUROPE for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences2-westeurope.azurewebsites.net";
          aadClient = this.aadClient2WESTEUROPE;
          break;
          }
        case "brazilsouth":
          {
          if (this.aadClient2BRAZILSOUTH === undefined)
            {
            webapp_appid = "7b40a34c-74bb-4770-9028-90864e2a697a";
            this.aadClient2BRAZILSOUTH = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClient2BRAZILSOUTH for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences2-brazilsouth.azurewebsites.net";
          aadClient = this.aadClient2BRAZILSOUTH;
          break;
          }
        case "australiaeast":
          {
          if (this.aadClient2AUSTRALIAEAST === undefined)
            {
            webapp_appid = "c8759268-e08c-4182-a702-e2f5a3d81063";
            this.aadClient2AUSTRALIAEAST = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClient2AUSTRALIAEAST for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences2-australiaeast.azurewebsites.net";
          aadClient = this.aadClient2AUSTRALIAEAST;
          break;
          }
        case "southindia":
          {
          if (this.aadClient2SOUTHINDIA === undefined)
            {
            webapp_appid = "35144c2a-6dc4-4192-887c-6459ec4ed1bf";
            this.aadClient2SOUTHINDIA = await this.context.aadHttpClientFactory.getClient(webapp_appid);
            console.log("Created aadClient2SOUTHINDIA for webapp_id: '" + webapp_appid + "'");
            }
          webapp_uri = "https://chiverton365-preferences2-southindia.azurewebsites.net";
          aadClient = this.aadClient2SOUTHINDIA;
          break;
          }
        default:
          {
          throw new Error ('region not implemented');
          }
        }

        // create an AadHttpClient
        //const aadClient: AadHttpClient = await this.context.aadHttpClientFactory.getClient(webapp_appid);
        //console.log("Created aadClient for webapp_id: '" + webapp_appid + "'");

        const requestHeaders: Headers = new Headers();
        requestHeaders.append('Content-type', 'application/json');
        requestHeaders.append('Cache-Control', 'no-cache');

        const requestOptions: IHttpClientOptions =  {
                                                    headers: requestHeaders,
                                                    body:   JSON.stringify(testdata)
                                                    };

        console.log("posting data to cosmos db at region " + region);
        let startedAt = Date.now();
        let clientPostResponse: HttpClientResponse = await aadClient.post(webapp_uri + '/preferences', AadHttpClient.configurations.v1, requestOptions);
        let endedAt = Date.now();
        let elapsedPost = datefns.differenceInMilliseconds(endedAt, startedAt);
        let txt : string = await clientPostResponse.text();
        let o = txt ? JSON.parse(txt) : {};
        let duration_cosmos_post = o.duration;
        console.log("response from POST2 = " + txt);

        console.log("getting data2 from cosmos db at region "+ region);
        startedAt = Date.now();
        let clientGetResponse : HttpClientResponse = await aadClient.get (webapp_uri + '/preferences/user2@domain.com', AadHttpClient.configurations.v1);
        endedAt = Date.now();
        let elapsedGet = datefns.differenceInMilliseconds(endedAt, startedAt);
        txt = await clientGetResponse.text();
        o = txt ? JSON.parse(txt) : {};
        let duration_cosmos_get = o.duration;
        console.log("response from GET2 = " + txt);

        waTiming = {"duration_function_get":  (elapsedGet  - duration_cosmos_get),
                    "duration_function_post": (elapsedPost - duration_cosmos_post),
                    "duration_cosmos_get":    duration_cosmos_get,
                    "duration_cosmos_post":   duration_cosmos_post
                  };
      }
    catch (e)
      {
      console.log (e.message);
      waTiming =  {"duration_function_get": 0,
          "duration_function_post": 0,
          "duration_cosmos_get": 0,
          "duration_cosmos_post": 0
          };
      }

    return new Promise<IAzureFunctionTimingData>(resolve => {
      resolve(waTiming);
    });
  }

  private async getAllTimings () : Promise<IDurations>
  {
    let  durationTrafficManager : ITrafficManagerData           = {webapp_uri:"", webapp_appid:"", duration:0};
    let  durationUserProfile : IUPSTimingData                   = {duration_function_get: 0, duration_function_post:0};
    let  durationWebAppEASTUS : IAzureFunctionTimingData        = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebAppJAPANEAST : IAzureFunctionTimingData     = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebAppWESTEUROPE : IAzureFunctionTimingData    = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebAppWESTUS : IAzureFunctionTimingData        = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebAppBRAZILSOUTH : IAzureFunctionTimingData   = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebAppAUSTRALIAEAST : IAzureFunctionTimingData = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebAppSOUTHINDIA : IAzureFunctionTimingData    = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebApp2EASTUS : IAzureFunctionTimingData        = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebApp2JAPANEAST : IAzureFunctionTimingData     = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebApp2WESTEUROPE : IAzureFunctionTimingData    = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebApp2WESTUS : IAzureFunctionTimingData        = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebApp2BRAZILSOUTH : IAzureFunctionTimingData   = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebApp2AUSTRALIAEAST : IAzureFunctionTimingData = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};
    let  durationWebApp2SOUTHINDIA : IAzureFunctionTimingData    = {duration_function_get: 0, duration_function_post:0, duration_cosmos_get: 0, duration_cosmos_post:0};


    // run these in parallel
    let d0 = this.getTrafficManagerTiming();
    let d1 = this.getUserProfileTiming();

    let d2 = this.getWebAppTiming("eastus");
    let d3 = this.getWebAppTiming("westus");
    let d4 = this.getWebAppTiming("westeurope");
    let d5 = this.getWebAppTiming("japaneast");
    let d6 = this.getWebAppTiming("brazilsouth");
    let d7 = this.getWebAppTiming("australiaeast");
    let d8 = this.getWebAppTiming("southindia");

    let d22 = this.getWebApp2Timing("eastus");
    let d23 = this.getWebApp2Timing("westus");
    let d24 = this.getWebApp2Timing("westeurope");
    let d25 = this.getWebApp2Timing("japaneast");
    let d26 = this.getWebApp2Timing("brazilsouth");
    let d27 = this.getWebApp2Timing("australiaeast");
    let d28 = this.getWebApp2Timing("southindia");

    durationTrafficManager    = await d0;
    //durationTrafficManager    = {webapp_uri: "https://chiverton365-preferences-eastus.azurewebsites.net", webapp_appid: "0", regionDurations: [0,106,0,0,0,0,0,0]};
    durationUserProfile       = await d1;

    durationWebAppEASTUS      = await d2;
    durationWebAppWESTUS      = await d3;
    durationWebAppWESTEUROPE  = await d4;
    durationWebAppJAPANEAST   = await d5;
    durationWebAppBRAZILSOUTH  = await d6;
    durationWebAppAUSTRALIAEAST = await d7;
    durationWebAppSOUTHINDIA    = await d8;

    durationWebApp2EASTUS      = await d22;
    durationWebApp2WESTUS      = await d23;
    durationWebApp2WESTEUROPE  = await d24;
    durationWebApp2JAPANEAST   = await d25;
    durationWebApp2BRAZILSOUTH  = await d26;
    durationWebApp2AUSTRALIAEAST = await d27;
    durationWebApp2SOUTHINDIA    = await d28;

    //  determine which region was selected by Traffic Mgr (and show for that region's stacked bar)


    return new Promise<IDurations>(resolve => {
        let durations : IDurations = {
                  "durationTrafficManager":       durationTrafficManager,
                  "durationUserProfile":          durationUserProfile,
                  "durationWebAppEASTUS":         durationWebAppEASTUS,
                  "durationWebAppJAPANEAST":      durationWebAppJAPANEAST,
                  "durationWebAppWESTUS":         durationWebAppWESTUS,
                  "durationWebAppWESTEUROPE":     durationWebAppWESTEUROPE,
                  "durationWebAppBRAZILSOUTH":    durationWebAppBRAZILSOUTH,
                  "durationWebAppAUSTRALIAEAST":  durationWebAppAUSTRALIAEAST,
                  "durationWebAppSOUTHINDIA":     durationWebAppSOUTHINDIA,
                  "durationWebApp2EASTUS":         durationWebApp2EASTUS,
                  "durationWebApp2JAPANEAST":      durationWebApp2JAPANEAST,
                  "durationWebApp2WESTUS":         durationWebApp2WESTUS,
                  "durationWebApp2WESTEUROPE":     durationWebApp2WESTEUROPE,
                  "durationWebApp2BRAZILSOUTH":    durationWebApp2BRAZILSOUTH,
                  "durationWebApp2AUSTRALIAEAST":  durationWebApp2AUSTRALIAEAST,
                  "durationWebApp2SOUTHINDIA":     durationWebApp2SOUTHINDIA
                };
        resolve(durations);
      });
  }

  private async getBestPerformingWebApp () : Promise<ITrafficManagerData>
    {
      //  Get the URL of the most-performant Azure Function WebApp
      //
      const requestHeaders: Headers = new Headers();
      requestHeaders.append('Content-type', 'application/json');
      requestHeaders.append('Cache-Control', 'no-cache');

      const httpClientOptions: IHttpClientOptions = {
        headers: requestHeaders
      };

      let response: HttpClientResponse = await this.context.httpClient.get("https://chiverton365-preferences.trafficmanager.net/hello", HttpClient.configurations.v1, httpClientOptions);
      let txt = await response.text();
      var s = txt ? JSON.parse(txt) : {};

      return new Promise<ITrafficManagerData> (resolve => {
        console.log("response from traffic mgr 'hello' = " + JSON.stringify(s));
        let trafficMgrData : ITrafficManagerData = {webapp_appid: s.appid, webapp_uri: s.url, duration: 0};
        resolve(trafficMgrData);
      });
    }

    public onInit(): Promise<any> {

      return super.onInit().then(_x => {

        // other init code may be present

        pnpSetup({
          spfxContext: this.context
        });

        //  Use custom myPromise to control when render gets called (https://sharepoint.stackexchange.com/questions/222515/sharepoint-framework-spfx-oninit-promises/222627)
        //
        this.myPromise = this.getAllTimings();
        });
    }

    private refreshChart() : void
      {
      this.myPromise = this.getAllTimings();
      this.render();
      }

    public render(): void {
      this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Azure Region timings for CosmosDB Perfmon.");
      this.myPromise.then ((durations : IDurations) =>{
        console.log("render");
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        const element: React.ReactElement<ICosmodbPerfmonWebPartProps > = React.createElement(
          CosmodbPerfmon,
          {
            description: this.properties.description,
            ctx: this.context,
            durations: durations,
            buttonclick: this.refreshChart.bind(this)
          }
        );
        ReactDom.render(element, this.domElement);
      }).catch(e => {
        console.log(e);
        });
      }

    protected onDispose(): void {
      ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
      return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
      return {
        pages: [
          {
            header: {
              description: strings.PropertyPaneDescription
            },
            groups: [
              {
                groupName: strings.BasicGroupName,
                groupFields: [
                  PropertyPaneTextField('description', {
                    label: strings.DescriptionFieldLabel
                  })
                ]
              }
            ]
          }
        ]
      };
    }
  }
