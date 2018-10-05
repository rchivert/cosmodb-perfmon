import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ITrafficManagerData {
  webapp_uri: string;
  webapp_appid: string;
  duration: number;
}
export interface IUPSTimingData {
  duration_function_get: number ;    // duration of the Azure Function call round-trip, minus the cosmos db portion
  duration_function_post: number;   // duration of the Azure Function call round-trip, minus the cosmos db portion
}
export interface IAzureFunctionTimingData {
  duration_function_get: number;    // duration of the Azure Function call round-trip, minus the cosmos db portion
  duration_function_post: number;   // duration of the Azure Function call round-trip, minus the cosmos db portion
  duration_cosmos_get: number ;
  duration_cosmos_post: number ;
}
export interface IDurations {
  durationTrafficManager : ITrafficManagerData ;
  durationUserProfile : IUPSTimingData;
  durationWebAppEASTUS : IAzureFunctionTimingData;
  durationWebAppJAPANEAST : IAzureFunctionTimingData;
  durationWebAppWESTUS : IAzureFunctionTimingData;
  durationWebAppWESTEUROPE : IAzureFunctionTimingData;
  durationWebAppBRAZILSOUTH : IAzureFunctionTimingData;
  durationWebAppAUSTRALIAEAST : IAzureFunctionTimingData;
  durationWebAppSOUTHINDIA : IAzureFunctionTimingData;
}

export interface ICosmodbPerfmonProps {
  description: string;
  ctx: WebPartContext;
  durations : IDurations;
  buttonclick: () => void;
}



