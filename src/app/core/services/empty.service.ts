import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EmptyService {
	
	isEmpty(data: any) {
		if(typeof(data) === 'object'){
			if(JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'){
				return true;
			}else if(!data){
				return true;
			}
			return false;
		}else if(typeof(data) === 'string'){
			return !data.trim();
			
		}else return typeof (data) === 'undefined';
	}
	
}
