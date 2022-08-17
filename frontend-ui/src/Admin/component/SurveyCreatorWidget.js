import React from "react";
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

import {SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";

const creatorOptions = {
    showLogicTab: true,
    isAutoSave: true
};

export function SurveyCreatorWidget(){
    const creator = new SurveyCreator(creatorOptions);

    creator.onElementAllowOperations.add(function (_, options) {
        if (options.obj?.getType() === "dropdown") {
          options.allowChangeType = false;
        }
      });

    return(
        <SurveyCreatorComponent creator={creator} />
    );
}