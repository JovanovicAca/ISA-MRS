Vue.component("EmployeeHome", {
    data: function() {
        return {

        }
    },

    template: `
	    <div> 
		<div class="header">
			<a href="" class="welcome">Welcome</a>	
			<div class="header-options">
    		 
  </div>
		</div>	
	    	<div id="emp-home-main">
	    		<h1 id="emp-home-h1">Doctor page</h1>
	    		<div v-on:click="profile()" class = "emp-home-item">
	    		
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/profile.png)">
	    			
	    			</div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Edit your personal information</li>
    					<li>Change your password</li>
    				</ul>
	    			</div>
	    		</div>
	    		<div v-on:click="calendar()" class = "emp-home-item">
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/calendar.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Check your working calendar</li>
    					<li>Check details of appointment</li>
    					<li>Request absence</li>
    					<li>Start an appointment</li>
    				</ul>
	    			</div>
	    		</div>
	    		<div v-on:click="appointment()" class = "emp-home-item">
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/appointment.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">

	    			<ul>
    					<li>See your past appointments</li>
    					
    				</ul>
	    			</div>
	    		</div>
	    		<div v-on:click="newAppointment()" class = "emp-home-item">
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/newAppointment.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Book new appointment</li>
    					<li>Choose an appointment you want to take</li>
    				</ul>
	    			</div>
	    		</div>

				
	    		
	    		<div id="issdiv" v-on:click="issue()" class = "emp-home-item">
	    		
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/drug.png)"></div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Issue reserved drugs</li>
    				</ul>
	    			</div>
	    		</div >
	    		<div v-on:click="logout()" class = "emp-home-item">
	    		
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/exit.png)"></div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>Logout from the system</li>
    				</ul>
	    			</div>
	    		</div >

	    	</div>		  
	    </div>
`,
    methods: {
        profile: function() {
            this.$router.push("/profile")
        },
        calendar: function() {
            this.$router.push("/workingCalendar")
        },
        appointment: function(){
        	this.$router.push("/appointments")
        },
        newAppointment: function(){
        	this.$router.push("/newAppointment")
        },
		logout: function()
        {
        	this.$router.push("/logout")
        },
        issue : function(){
        	this.$router.push("/issueing")
        },
    },
    mounted (){
    	if((JSON.parse(localStorage.getItem('user'))).role!='PHARMA'){
    		$('#issdiv').hide();
    	}
    }
});