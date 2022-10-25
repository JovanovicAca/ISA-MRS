Vue.component("WriteComplaint",{
	data: function () {
	    return {
          user: {

            },
            userComplaint: {
                id: ""
            },
          complaint: "",
          display: [],
	    }
    },
	    
	    template : ` 
<div>
	    	<h1>Write Complaint</h1>
            <div id="main">
	    	    <td><textarea type="text" id="place" rows="5" placeholder="Your complaint here:" v-model="complaint"> </textarea></td>
            </div>
            <div style="overflow-y: scroll;">
            <table id="appstable" width="1000px">
                <tr><th>Name</th><th>Surname</th><th>Works as</th>Select for complaint</tr>
                <tr v-for="x in display">
                <td>{{x.name}}</td>{{x.surname}}<td>{{x.role}}</td><td><button type="button" v-on:click="sub(x, x.name, x.surname)" class="table-btn">Select</button></td>
                </tr>
            </table>
            </div>
            <br></br>

            <div>
                <button class="button" v-on:click="write()" type="button">Write Complaint</button>
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
		sub : function(x, name, surname){
			this.userComplaint = x;
			$('#dialogMes').html('Selected employee: ' + name + " " + surname);
			$('#dialog').dialog("open");
		},
        write: function(){

            var place = $('#place').val();
            if(place==''){
                $('#dialogMes').html('Complaint text can not be empty!');
                $('#dialog').dialog("open");
                return;
            }

            if(this.userComplaint.id === ""){
                $('#dialogMes').html('You must select employee to write complaint about!');
                $('#dialog').dialog("open");
                return;
            }

            this.user = JSON.parse(localStorage.getItem('user'))
            axios
            .put("/PATIENT/writeComplaint/" + this.complaint + "/" + this.userComplaint.id, this.user)
            .then(response => (this.appsDisplay = response.data))
            $('#dialogMes').html('Complaint sent!');
            $('#dialog').dialog("open");
            window.location.reload()
        },
        load: async function(){
            await axios
            .get("/PATIENT/getEmployeesComplaint/")
            .then(response => (this.display = response.data))
            for (var i = 0, l = this.display.length; i < l; i++) {
                //var obj =  ;
                if(this.display[i].role === "DERMA"){
                    this.display[i].role = "Dermatologist"
                }else{
                    this.display[i].role = "Pharmacist"
                }
            }
        },
		goBack: function(){
            this.$router.push("/rateEmployee")
        },
		
	},
	mounted(){
        this.load()
		this.user = JSON.parse(localStorage.getItem('user'))
		try{
			if(this.user.role != "PATIENT"){
				if(this.user.role === "SUPPLY"){
					this.$router.push("/supplierHome")
				}
				if(this.user.role === "ADMIN"){
                    if(this.user.adminType === "SYSTEM"){
                        this.$router.push("/systemAdminHome")
                    }else{
                        this.$router.push("/pharmaAdminHome")
                    }			
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