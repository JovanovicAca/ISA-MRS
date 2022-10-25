Vue.component("CancelConsultation",{
	data: function () {
	    return {
	    	mail : "",
	    }
	},
	    
	    template : ` 
	    
    		<div id="cancelConsult-div">
	    		<link rel="stylesheet" href="CSS/cancelConsultation.css" type="text/css">
		    	<h1 id="reservePharma-h1">Veiw Pharmacists and reserve Consultation</h1>
		    	<div class = "reserveKalendarItem">
			    	<div style="text-align: center;"></div>
		    		<div id="reserveKalendar">
		    			<div id="nacalendar"></div>
		    		</div>
	    		</div>
	    		<div class = "reserveOstalo">
    				<input type="text" class="search-res" placeholder="Search pharmacists by Name/Surname..."/>
	    			<div class = "inputData-res">
	    			
	    			</div>
					<button class="homeBtn-res"  type="submit" v-on:click="goHome">Home Page</button>
				</div>	
			</div>    	
`
	,
	methods : {
		
		goHome: function()
		{
			this.$router.push("/patientHome")
		},
		
		getData: async function(cal,newElement){
			this.map = {};
			var mapa = {};
			let event = cal.addEvent({
				title: "Dusan",
				element: 1,
			});
			this.map = mapa;
		},
		
		drawCalendar: function(newElement)
		{
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
	        });
	        this.getData(calendar,newElement);
	        calendar.render();
		},
	},
	
	mounted(){
		this.drawCalendar();
			
		}, 
		components: {
	      	vuejsDatepicker
	    },
	
});