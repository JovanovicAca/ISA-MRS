Vue.component("Appointments",{
	data: function () {
	    return {
	      appsDTO : null,
	      appsDisplay: null
	    }
	},
	    
	    template : ` 
<div>
	    		<h1>Appointments</h1>
	    	<div>
	    	<button v-on:click = "searchName()">Search</button><input id="search" type="text">
	    	</div>
	    	<div style="overflow-y: scroll;">
	    		
	    		<table id="appstable">
	    		</table>
	    	</div>
	    	

</div>
`
	,
	methods : {
		searchName: function(){
			var sub =  document.getElementById('search').value;
			var newDisplay = new Array();
			this.appsDTO.forEach(function(item){if(item.patient.toLowerCase().includes(sub.toLowerCase())){
				newDisplay.push(item);
			}});
			this.appsDisplay = newDisplay;
		},
		dateFormat: async function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	},
		
		load : async function(){
			await axios
			.get("/appointment/getDoctorAppointments/"+JSON.parse(localStorage.getItem("user")).id+"/true")
			.then(response => (this.appsDTO = response.data))
			
			this.appsDisplay = new Array();
			this.appsDisplay = this.appsDTO.slice();
			$("#appstable").DataTable({
				data : this.appsDisplay,
				columns: [
		            { data: "mail", title : "mail"},
		            { data: "patient",title: "Patient" },
		            { data: "pharmacyName",title: "Pharmacy" },
		            { data: "address",title: "Address" },
		            { data: "endTime",title: "Date" }
		        ],
		        "columnDefs": [
		            {
		               
		                "render": function ( data, type, row ) {
		                    var parsed = moment(data);
		            		return parsed.format('DD.MM.YYYY');
		                    
		                },
		                "targets": 4
		            },
		            
		        ]
				
			});
			//$('#appstable').DataTable();
		},
		
		
	},
	mounted(){
		this.load();
		
	},
	
	filters: {
    	
   	}
});