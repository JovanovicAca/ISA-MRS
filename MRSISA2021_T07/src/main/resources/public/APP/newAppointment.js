Vue.component("NewAppointment",{
	data: function () {
	    return {
	      appo: {
	    	  mail: "",
	    	  abbs: null,
	    	  newapp: null,
	      }
	    }
	},
	    
	    template : ` 
<div>
	    		<div style="text-align: center;">
	    			<h1>Working Calendar</h1>
	    			
	    		</div>
	    		<div id="nacalendar-sidebar">
	    		<h2>New appointment</h2>
	    		<table>
	    			<tr>
	    				<td>Enter patients email:</td>
	    			</tr>
	    			<tr>
	    				<td><input v-model="appo.mail" type="text" /></td>
	    			</tr>
	    			<tr>
	    				<td><button v-on:click="getCurrentPatient()">Get patient currently examined</button></td>
	    			</tr>
	    			<tr>
	    				<td>Choose date of appointment:</td>
	    			</tr>
	    			<tr>
	    				<td><input v-model="appo.date" type="datetime-local"></td>
	    			</tr>
	    			<tr>
	    				<td>Choose appointment duration(minutes)</td>
	    			</tr>
	    			<tr>
	    				<td><input v-model="appo.dur" type="number" step="5" value="30" min="15" max="120"></td>
	    			</tr>
	    			<tr>
	    				<td>Enter appointment price</td>
	    			</tr>
	    			<tr>
	    				<td><input v-model="appo.price" type="number" value="1000"></td>
	    			</tr>
	    			<tr>
	    				<button v-on:click="requestAppointment()">Create new appointment</button>
	    			</tr>
	    			<tr>
	    			<td><button v-on:click="goHome()">Home</button></td>
	    			</tr>
	    			
	    		</table>
	    		</div>
	    		<div id="nacalendar-main">
	    			<div id="nacalendar">
	    		
	    			</div>
	    		</div>
	    		<div id="appdialog" title="Notification">
	    			<p >Do you want to take this appointment for current patient?</p>
	    		</div>
	    	</div>	  
`
	,
	methods : {
		
		getCurrentPatient: async function(){
			var res="";
			//console.log(this.appo.mail);
			res = (JSON.parse(localStorage.getItem("appo"))).mail;
			this.appo.mail=res;
		},
		
		requestAppointment: async function(){
			var appdto = new Object();
			appdto.startTime = this.appo.date;
			appdto.endTime = moment(this.appo.date).add(this.appo.dur, 'm').toDate();
			appdto.price = this.appo.price;
			appdto.mail = this.appo.mail;
			await axios 
			.post("/appointment/newDoctorAppointment/"+JSON.parse(localStorage.getItem("user")).id, appdto)
			.then((response) => {})
				.catch((error) => {
        		alert(error.response.data)
					})
		},
		
		getData: async function(cal){
		await axios 
		.get("/appointment/getDoctorAppointments/"+JSON.parse(localStorage.getItem("user")).id+"/false")
		.then(response => (this.appsDTO = response.data))
			this.appsDTO.forEach(function(el){
				
				var t = el.patient;
				if(t==null){
					t = "Empty appointment";
				}
				console.log(t);
				let event = cal.addEvent({
					id: el.id,
					title: t,
					start: el.startTime,
					end: el.endTime,
					address: el.address,
					element: el,
				});
			})
		await axios
		.get("/absence/getDoctorAbsences/"+JSON.parse(localStorage.getItem("user")).id+"/false")
		.then(response => (this.abbs = response.data))
		this.abbs.forEach(function(el){
			var tit;
			var col;
			if(el.approved==null){
				col="yellow";
				tit = "Pending approval of absence";}
				else if(el.approved){
				col = "green";
				tit = "Approved absence";
				}else{
					col = "red";
					tit = "Denied absence";
				}
			
			let event = cal.addEvent({
				id: el.id,
				title: tit,
				start: el.startDate,
				end: el.endDate,
				color: col,
				textColor: "black",
				element: el,
			})
		})
		},
		goHome : async function(){
    		console.log("Going home!");
    		this.$router.push("/employeeHome");
    	},
	},
	
mounted(){
		var ovo = this;
		 var startDia = $('#appdialog').dialog({
        	autoOpen: false,
            resizable: false,
            draggable: false,
            height: 200,
            width: 300,
            modal: true,
            buttons: {
              Yes : function() {
            	  startDia.dialog("close");
                ovo.$router.push("/employeeHome");
                axios
                .post("/appointment/takeDoctorAppointment/"+JSON.parse(localStorage.getItem("user")).id+"/"+JSON.parse(localStorage.getItem("appo")).mail+"/"+ovo.newapp)
                .then((response) => {})
				.catch((error) => {
        		alert(error.response.data)
					})
              },
              No : function() {
            	  startDia.dialog("close");
              },
            }
          
        });
		
		var calendarEl = document.getElementById('nacalendar');
		var today = new Date();
        var calendar = new FullCalendar.Calendar(calendarEl, {
        	height: 'auto',
          initialView: 'dayGridMonth',
          nowIndicator: true,
          initialDate: today,
          headerToolbar:{
        	  left:'prev,next today',
        	  center: 'title',
        	  right:  'dayGridMonth,timeGridWeek,timeGridDay',
          },
        	events: [],
        	eventClick: function(info) {
        		if(info.event.title=="Absence"){
        			return;
        		}
        		if(info.event.title=="Empty appointment"){
        			ovo.newapp = info.event.id;
        			startDia.dialog("open");
        			return;
        		}
        	    
        	  }
        });
        this.getData(calendar);
        calendar.render();
	}, 
	components: {
      	vuejsDatepicker
    },
});