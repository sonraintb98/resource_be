const responseMessage = {
  fieldIsNotEmpty: "The '%s' cannot be empty. Please enter a value.",
  fieldIsNotCorrectFormat: "This '%s' is not in the correct format!",
  notFound: "'%s' is not found. Please try again!",
  existedRecord:
    "The '%s' is already used, please choose another one to sign up!",
  emptyWorkingTimelines: 'The list of working timelines is empty!',
  parametersDoNotSupport:
    "These filter conditions '%s' do not support. Please check again",
  duplicateWorkingTimelines:
    'The list of working timelines contains duplicate records! Id: %s',
  duplicateFilterWorkingTimelines:
    'The list of filters contains duplicate conditions - %s!',
  duplicateProjects:
    'The name and location of your project exist! Please choose another one.',
  cannotDeleteProject:
    'This Project has been assigned by the working timelines. You need to remove it from the working timelines first.',
  cannotUpdateProject:
    "This Project has been assigned by the working timelines. You can not update 'start date' or 'end date'. You need to remove it from the working timelines first.",
  cannotRevokeToken:
    'You need to provide at least a refresh token or a id token to revoke these tokens.',
  invalidToken: 'Invalid token. Please try again!',
  unknownException: 'Unknown exception!',
  duplicateSkill: "The '%s' of your skill exist! Please choose another one.",
  assignedToTimeline:
    "This '%s' has been assigned by the working timelines. You need to remove it from the working timelines first.",
  dbExistedRecord: "The '%s' already exists, please choose another one!",
  duplicatePosition:
    "The '%s' of your position exist! Please choose another one.",
  duplicateLevelOfSkill:
    "The '%s' of your level-of-skill exist! Please choose another one.",
  memberSkillAllReadyExisted: 'This skill and level is existed! Please check!',
  memberSkillIsNotExisted: 'This skill and level is not existed anymore!',
  duplicateSkillTimelines:
    'The list of skill timelines contains duplicate records! Id: %s',
  duplicateSalaryTimelines:
    'The list of salảy timelines contains duplicate records! Id: %s',
  emptySalaryTimelines: 'The list of salary timelines is empty!',
  cannotUpdatePersonnelInfo: 'Cannot update personnel info!',
  duplicateResourceInfo: "The '%s' is exist! Please choose another one.",
  duplicateResourceUnitPrice: "The '%s' is exist! Please choose another one.",
  duplicateResourceProjectCode: "The '%s' is exist! Please choose another one.",
};

export default responseMessage;
