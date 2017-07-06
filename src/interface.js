export default{
  // **********  get  *********//
  // *                         //
  // *                         //
  // **********  ***  *********//
  // TOTAL
  TODAY_TOTALPERSON: 'apiServer/facetrackManage/getFacetrackList',
  TODAY_STRANGER: 'apiServer/facetrackManage/getUnMatchedList',
  TODAY_USER: 'apiServer/personManage/getMatchedPersonList',
  // USER
  USER_GETINFOS: 'apiServer/personManage/getPersonMatchedList',
  USER_UNMATCHEDHISTORY: '/apiServer/personManage/getPersonUnMatchedList',
  USER_LEAVEMESSAGE: 'apiServer/personManage/uploadPersonInfo', // (POST)
  USER_CONFIRM: '/apiServer/personManage/confirmFacetrackByPerson', // (POST)
  USER_FACETRACK_GIF: 'apiServer/facetrackManage/getFacetrackImgs',
  // STRANGER
  STRANGER_CREATEUSER: 'wxServer2/admin/createPersonByFacetrack', // POST
  STRANGER_ANALYSE: 'apiServer/facetrackManage/getFacetrackInfo',
  // 智能分析选中添加
  STRANGER_ANALYSE_UPDATE: 'apiServer/facetrackManage/addFacetrackToPerson', // POST
  // REGISTER USER
  GET_ALL_REGISTERUSER: 'apiServer/personManage/getPersonList',
  USER_ADDNEW: 'wxServer2/admin/createPersonByImgs', // POST
  USER_EDIT: 'wxServer2/admin/uploadPersonInfo', // POST
  USER_SEARCH: '/apiServer/personManage/searchPerson',
  USER_DELETE: 'apiServer/personManage/deletePerson'
}
