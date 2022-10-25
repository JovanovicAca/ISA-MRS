Vue.component("FirstLogin", {
    data: function() {
        return {
        	user:{
        		
        	}
        }
    },

    template: `
	    <div> 
	    <div id="fl-main">
	    	<h1 id="h1-fl">Set new password</h1>
	    
				<table id="fl-table">
					<tr>
						<td>Enter new password:</td>
						<td><input id="newp" type="password" /></td>
					</tr>
					<tr>
					<td>Enter new password:</td>
						<td><input id="repp" type="password" /></td>
					</tr>
					<tr><td><button v-on:click="change()">Change password</button></td></tr>
				</table> 
			</div>
			<div id="profdialog" title="Notification">
	    			<p id="profp"></p>
	    		</div> 
	    </div>
`,
    methods: {
       change : async function(){
    	   neu = $("#newp").val();
    	   rep = $("#repp").val();
    	   if(neu=='' || rep==''){
				$('#profp').html('Empty password field!');
	    		$('#profdialog').dialog("open");
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
			this.$router.push("/");
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