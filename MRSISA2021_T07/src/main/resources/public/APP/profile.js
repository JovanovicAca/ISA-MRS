Vue.component("Profile",{
	data: function () {
	    return {
	    	user: {
	    		
	    	}
	    }
	},
	    
	    template : ` 
<div id="profile-div">


	    	<link rel="stylesheet" href="CSS/profile.css" type="text/css">
	   
	   
	    	<h1 id="h1-profile">Change profile</h1>
	    		<table id="profile-table">
	    			<tr>
	    				<td>Name: </td>
	    				<td><input type="text" name="ime" v-model="user.name"></td>
	    			</tr>
	    			<tr>
	    				<td>Surname: </td>
	    				<td><input type="text" v-model="user.surname"></td>
	    			</tr>
	    			<tr>
	    				<td>Email: </td>
	    				<td><input type="text" v-model="user.email" ></td>
	    			</tr>
	    			<tr>
	    				<td>Adress: </td>
	    				<td><input type="text" v-model="user.address"></td>
	    			</tr>
	    			<tr>
	    				<td>City: </td>
	    				<td><input type="text" v-model="user.city"></td>
	    			</tr>
	    			<tr>
	    				<td>Country: </td>
	    				<td><input type="text" v-model="user.country"></td>
	    			</tr>
	    			<tr>
	    				<td><button v-on:click="goBack()">Home</button></td>
          				<td><button v-on:click="edit()">Edit</button></td>
	    			</tr>
	    		</table>
	    		<h2>Change password</h2>
	    		<table id="password-table">
	    		<tr><td>Enter password:</td><td><input id="oldpswd" type="password"/></td></tr>
	    		<tr><td>Enter new password:</td><td><input id="newpswd" type="password"/></td></tr>
	    		<tr><td>Repeat new password:</td><td><input id="reppswd" type="password"/></td></tr>
	    		<tr><button v-on:click="changePassword()">Change password</button></tr>
	    		</table>
	    		<div id="profdialog" title="Notification">
	    			<p id="profp"></p>
	    		</div>
		
</div>		  
`
	,
	methods : {
		edit : function(){
			axios
			.put("/derma/updateDermatologist", this.user)
		},
		goBack : function(){
			this.$router.push("/employeeHome")
		},
		changePassword : async function(){
			var old = $('#oldpswd').val();
			var neu = $('#newpswd').val();
			var rep = $('#reppswd').val();
			if(neu=='' || rep==''){
				$('#profp').html('Empty password field!');
	    		$('#profdialog').dialog("open");
				return;
			}
			if(old!=this.user.password){
				$('#profp').html('Wrong password!');
	    		$('#profdialog').dialog("open");
				//alert('Wrong password!');
				return;
			}
			if(neu != rep){
				$('#profp').html('Passwords do not match!');
	    		$('#profdialog').dialog("open");
				//alert('Passwords do not match!');
				return;
			}
			await axios
			.put("/login/changePassword/"+this.user.id+"/"+neu)
			.then()
			$('#profp').html('Password changed successfully');
		    		$('#profdialog').dialog("open");
		}
	},
	mounted(){
		
			this.user = JSON.parse(localStorage.getItem('user'));
			var dialog
	        dialog = $('#profdialog').dialog({
	        	autoOpen: false,
	            resizable: false,
	            draggable: false,
	            height: 200,
	            width: 250,
	            modal: true,
	            buttons: {
	              Ok : function() {
	                dialog.dialog("close");
	              },  
	            }});
	},
	
	
});