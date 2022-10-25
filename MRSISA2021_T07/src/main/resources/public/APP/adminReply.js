Vue.component("AdminReply",{
	data: function () {
	    return {
          user: {

            },
            userComplaint: {
                
            },
          reply: "",
          complaintID: "",
          display: [],
	    }
    },
	    
	    template : ` 
<div>
	    	<h1>Write Complaint</h1>
            <div id="main">
	    	    <td><textarea type="text" id="place" rows="5" placeholder="Your reply here:" v-model="reply"> </textarea></td>
            </div>
            <div style="overflow-y: scroll;">
            <table id="appstable" width="930px">
                <tr><th>Name</th><th>Surname</th><th>Complaint</th>Select to reply</tr>
                <tr v-for="x in display">
                <td>{{x.name}}</td>{{x.surname}}<td>{{x.complaint}}</td><td><button type="button" v-on:click="sub(x.id)" class="table-btn">Select</button></td>
                </tr>
            </table>
            </div>
            <div>
                <button class="button" v-on:click="write()" type="button">Write Reply</button>
            </div>
			<div>
                <button class="button" v-on:click="goBack()">Back</button>
            </div>
	    	
            <div id="dialog" title="Notification">
	    	<p id="dialogMes"></p>
	        </div>		
</div>
`
	,
	methods : {
		sub : function(y){
			this.complaintID = y;
			$('#dialogMes').html('You have selected this complaint!');
			$('#dialog').dialog("open");
		},
        write: function(){

            var place = $('#place').val();
            if(place==''){
                $('#dialogMes').html('Reply text can not be empty!');
                $('#dialog').dialog("open");
                return;
            }

            if(this.complaintID === ""){
                $('#dialogMes').html('You must select complaint to reply!');
                $('#dialog').dialog("open");
                return;
            }
            axios
            .put("/admin/replyComplaint/" + this.reply + "/" + this.complaintID)
            .then(response => (this.appsDisplay = response.data))
            $('#dialogMes').html('Reply sent!');
            $('#dialog').dialog("open");
           // window.location.reload()
        },
        load: async function(){
            await axios
            .get("/admin/getComplaints")
            .then(response => (this.display = response.data))
        },
		goBack: function(){
            this.$router.push("/systemAdminHome")
        },
		
	},
	mounted(){
        this.load()
		this.user = JSON.parse(localStorage.getItem('user'))
		try{
			this.user = JSON.parse(localStorage.getItem('user'));
			
			if(this.user.role != "ADMIN"){
				if(this.user.role === "PATIENT"){
					this.$router.push("/patientHome")
				}
				if(this.user.role === "SUPPLY"){
					this.$router.push("/supplierHome")
				}
				if(this.user.role === "PHARMA"){
					this.$router.push("/employeeHome")
				}
				if(this.user.role === "DERMA"){
					this.$router.push("/employeeHome")
				}
			}
		}
		catch{
			this.$router.push("/")
		}

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


	}

});