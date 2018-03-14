import React, { Component } from 'react';

class AppCache{
	constructor(){
		this.email='';
		this.password='';
		this.auth=false;
		this.lid='';
	}
}

export default(new AppCache);