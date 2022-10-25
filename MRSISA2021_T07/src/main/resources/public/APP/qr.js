Vue.component("QR",{
	data: function () {
	    return {
	      piture: null,
          base64String: "",
          user: {

            }
	    }
       
	},
	    
	    template : ` 
<div>
	    	<h1>Upload your QR code for eRecipe</h1>
            <input type="file" name="" id="fileId" 
            @change="imageUploaded()">
            <br> </br>
            <div>
            <button v-on:click="upload()" class="table-btn">Upload</button>
            </div>
			<div>
            <button v-on:click="goBack()" class="table-btn">Back</button>
            </div>
	    	<div id="dialog" title="Notification">
	    	<p id="dialogMes"></p>
	        </div>		

</div>
`
	,
	methods : {
		goBack: function(){
            this.$router.push("/rateEmployee")
        },
        imageUploaded: function() {
            var file = document.getElementById('fileId').files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.base64String = reader.result;
            }
            console.log(this.base64String)
        },
        upload: function(){
            if(this.base64String === ""){
                $('#dialogMes').html('You must upload qr code!');
                $('#dialog').dialog("open");
                return;
            }
            this.user = JSON.parse(localStorage.getItem('user'))
            axios
				.post("/PATIENT/uploadQR/" + this.base64String.substring(22).trim(), this.user)
				.then(response => {
					//window.location.reload()
				})
        },
		
	},	
	mounted(){
        
        var dialog
			dialog = $('#dialog').dialog({
				autoOpen: false,
				resizable: false,
				draggable: false,
				height: 200,
				width: 250,
				modal: true,
				buttons: {
				Ok: function(){
					dialog.dialog("close");
				},	
				}});
		
	},
	
});