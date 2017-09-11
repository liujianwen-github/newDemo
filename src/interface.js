import config from './config.js'
export default{
  // POST
  POST_USER_IMAGE: config.projectName + '/user/createUserByImage',
  POST_USER_FACETRACK: config.projectName + '/user/createUserByFacetrack',
  // DELETE
  DELETE_USER: config.projectName + '/user/deleteUser',
  // PUT
  PUT_USER: config.projectName + '/user/updateUserInfo',
  PUT_STRANGER2PERSON: config.projectName + '/user/addFacetracks2Person',
  PUT_CONFIG: config.projectName + '/config/updateConfigs',
  // GET
  GET_FACRTRACKLIST: config.projectName + '/facetrack/getFacetrackList',
  GET_USER_LASTVISIT: config.projectName + '/facetrack/getLastUserVistInfo',
  GET_ALL_REGISTERUSER: config.projectName + '/user/getUserList',
  GET_STRANGER_ANALYSE: config.projectName + '/facetrack/getSimilarPerson',
  GET_PERSONHEADIMAGE: config.projectName + '/user/getPersonHeadImage',
  GET_FACETRACKIMAGE: config.projectName + '/facetrack/getFacetrackImage',
  GET_USERINFOS:config.projectName +  '/user/getUserMatchedFacetrack',
  GET_SCENEIMG:config.projectName +  '/facetrack/getFacetrackSceneImg',
  GET_FACETRACKIMAGES:config.projectName + '/facetrack/getFacetrackImages',
  GET_USER_UNMATCHED:config.projectName +  '/user/getUserSimilarFacetrack',
  GET_CONFIG:config.projectName + '/config/getAllconfig',

  //OS
  SHUTDOWN: config.projectName + '/poweroff'
}
