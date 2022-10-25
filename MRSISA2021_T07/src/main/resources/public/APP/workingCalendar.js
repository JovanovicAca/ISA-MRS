Vue.component("WorkingCalendar",{
	data: function () {
	    return {
	    	appsDTO: null,
	    	map: null,
	    	startDate: null,
	    	endDate: null,
	    	desc: null,
	    	dia: null,
	    	abbs: null,
	    	appDia: null,
	    }
	},
 
	    template : ` 
	    	<div>
	    		<div style="text-align: center;">
	    			<h1>Working Calendar</h1>
	    			
	    		</div>
	    		<div>
	    		<div class="wcalendar-sidebar">
	    		<h2>Appointment details</h2>
	    		<table>
	    			<tr>
	    				<td id="wctd1"></td>
	    			</tr>
	    			<tr>
	    				<td id="wctd2"></td>
	    			</tr>
	    			<tr>
	    				<td id="wctd3"></td>
	    			</tr>
	    			<tr>
	    				<td id="wctd4"></td>
	    			</tr>
	    			<tr>
	    				<td id="wctd5"></td>
	    			</tr>
	    			<tr>
	    				<td id="wctd6"></td>
	    			</tr>
	    			<tr>
	    				<td><button id="startApBtn" v-on:click="startAppointment()">Start appointment</button></td>
	    			</tr>
	    			
	    		</table>
	    		</div>
	    		<div id="wcalendar-main">
	    			<div id="wcalendar">
	    		
	    			</div>
	    		</div>
	    		<div id="absence" class="wcalendar-sidebar">
	    		<h2>Request absence</h2>
	    		<table id="absencerequest">
	    		<tr> <input id="abrange"type="text" name="daterangewc" placeholder="Select period" /></tr>
	    		<tr> <input v-model="desc"type="text" id="reqdesc" placeholder="Enter reasons for absence" /></tr>
	    		<tr> <button v-on:click="absenceRequest()">Send absence request</button></tr>
	    		<tr></tr>
	    		</table>
	    		</div>
	    		</div>
	    		<div id="wcdialog" title="Notification">
	    			<p id="papp">Lorem ipsum.</p>
	    		</div>
	    		<div id="appdialog" title="Notification">
	    			<p >Did patient come to the appointment?</p>
	    		</div>
	    	</div>		  
`
	,
	methods : {
		startAppointment: async function(){
			this.appDia.dialog("open");
		},
		
		absenceRequest: async function(){
			var dialog = this.dia;
			//var range = $('daterangewc').daterangepicker.getRange();
			//var startDate = range.start;
			//var endDate = range.end;
			var startDate = $('#abrange').data('daterangepicker').startDate._d;
			var endDate = $('#abrange').data('daterangepicker').endDate._d;
			var desc = this.desc
			var abs = new Object();
			startDate.setDate(startDate.getDate()+1);
			abs.startDate = startDate;
			abs.endDate = endDate;
			abs.description = this.desc;
			await axios
			.post("/absence/requestAbsence/"+JSON.parse(localStorage.getItem("user")).id, abs)
			.then((response) =>{
				dialog.dialog("open");
				$('#papp').html(response.data);
			})
			.catch((error) => {
				dialog.dialog("open");
				$('#papp').html(error.response.data);
        		//alert(error.response.data)
					})
			
		},
		
		getData: async function(cal){
			this.map = {};
			var mapa = {};
		await axios 
		.get("/appointment/getDoctorAppointments/"+JSON.parse(localStorage.getItem("user")).id+"/false")
		.then(response => (this.appsDTO = response.data))
			this.appsDTO.forEach(function(el){
				var t = el.patient;
				if(t==null){
					t = "Empty appointment";
				}
				let event = cal.addEvent({
					
					id: el.id,
					title: t,
					color: "blue",
					start: el.startTime,
					end: el.endTime,
					address: el.address,
					element: el,
				});
				mapa[el.id] = el;
			})
			this.map = mapa;
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
	},
	mounted(){
		var el;
		var ovo = this;
		var startAp = document.getElementById("startApBtn");
		startAp.style.display="none";
		var dialog;
		var startDia;
		var calendarEl = document.getElementById('wcalendar');
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
        			return;
        		}
        	    el = info.event.extendedProps.element;
        	    localStorage.setItem("appo", JSON.stringify(el));
        	    document.getElementById('wctd1').innerHTML = "Pharmacy: "+el.pharmacyName+", "+el.address;
        	    document.getElementById('wctd2').innerHTML = "Patient: "+el.patient+" , "+el.mail;
        	    document.getElementById('wctd3').innerHTML = "Price: "+el.price;
        	    document.getElementById('wctd4').innerHTML = "Starts at: "+el.endTime;
        	    document.getElementById('wctd5').innerHTML = "Ends at: "+el.startTime;
        	    document.getElementById('wctd6').innerHTML = "Doctor: "  +el.doctor;
        	    var startAp = document.getElementById("startApBtn");
        	    if(el.appeared!=null){
        	    	startAp.style.display = "none";
        	    }else{
        	    	startAp.style.display = "block";
        	    }
        	  }
        });
        this.getData(calendar);
        calendar.render();
        $('input[name="daterangewc"]').daterangepicker({
        	opens: 'top',
        	minDate: new Date(),
        },
        	function(start, end, label) {
        	this.startDate = start;
        	this.endDate = end;
        	    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        	}	  
        );
        //$('input[name="daterangewc"]').daterangepicker();
        dialog = $('#wcdialog').dialog({
        	autoOpen: false,
            resizable: false,
            draggable: false,
            height: 200,
            width: 300,
            modal: true,
            buttons: {
              Ok : function() {
                $('#wcdialog').dialog("close");
                location.reload();
              },  
            }});
        this.dia = dialog;
        startDia = $('#appdialog').dialog({
        	autoOpen: false,
            resizable: false,
            draggable: false,
            height: 200,
            width: 300,
            modal: true,
            buttons: {
              Yes : function() {
            	  startDia.dialog("close");
                ovo.$router.push("appointment");
               // axios
                //.post("/appointment/didPatientCome/"+JSON.parse(localStorage.getItem("appo")).id+"/true");
              },
              No : function() {
            	  startDia.dialog("close");
                ovo.$router.push("employeeHome");
                axios
                .post("/appointment/didPatientCome/"+JSON.parse(localStorage.getItem("appo")).id+"/false");
                
              },
            }
          
        });
        this.appDia = startDia;
	}, 
});