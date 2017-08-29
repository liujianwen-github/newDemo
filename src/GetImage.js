import config from '@/config'
import INTERFACE from '@/interface'
export default class GetImage{
	constructor(props){
	    // super(props);
	    this.url = cofig.HOST + INTERFACE.GET_PersonHeadImage + '?personId=' + props
	}
	getUrl(){
		return this.url
	}
}