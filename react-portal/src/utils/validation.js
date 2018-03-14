export const validation = {
	email:{
		presence:{
			message: 'Please enter an email address'
		},
		format: {
			pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			message: 'Please enter a valid email address'
		}
	},
	password:{
		presence:{
			message: 'Please enter a password'
		},
		length:{
			minimum:{
				val: 5,
				message: 'Your password must be at least 5 characters'
			},
			maximum:{
				val:8,
				message: 'Your password must be less than 8 characters'
			}
		}
	}
}

export function validate(nameField, value){
	let resp = [null, null];
	if(validation.hasOwnProperty(nameField)){
		//console.log("===Validation==="+nameField+"---"+value);
		let v = validation[nameField];
		if(value==='' || value===null){
			console.log("===Validation==="+value);
			resp[0] = false
			resp[1] = v['presence']['message']
		}else if(v.hasOwnProperty('format') && !v['format']['pattern'].test(value)){
			resp[0] = false
			resp[1] = v['format']['message']
		}else if(v.hasOwnProperty('length')){
			let l = v['length'];
			if(l.hasOwnProperty('minimum') && value.length<l['minimum']['val']){
				resp[0] = false
				resp[1] = l['minimum']['message']
			}
			if(l.hasOwnProperty('maximum') && value.length>l['maximum']['val']){
				resp[0] = false
				resp[1] = l['maximum']['message']
			}

		}else{
			resp[0] = true
		}
	}else{
		resp[0]=true
	}
	return resp;
}