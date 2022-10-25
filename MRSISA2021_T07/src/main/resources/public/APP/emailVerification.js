Vue.component("EmailVerification", {
    data: function() {
        return {
            code: "",
            email: "",
            isAuthenticated : null,
        }
    },
    template : ` 
    	<div id="profile1-div">
    		    	<link rel="stylesheet" href="CSS/emailVerification.css" type="text/css">
    		   
    		   <form id="registrationForm" method ="POST" @submit.prevent = "submitForm">
    		   
    		    	<h1 id="h1-verification">User Verification</h1>
	    		    	<form class="example" id="registrationForm" method ="POST" @submit.prevent = "submitForm">
						  <input type="text" v-model="code" placeholder="Enter Verification code..." name="ime">
						  <button type="submit" v-on:click="login">Submit</button>
						  <button id = "homeBTN" type="submit" v-on:click="home()">Home Page</button>
                         
                	     
            			
						</form>
    		    	</form>
    	</div>		  
    	`
    	,
    methods: {
        login: function() {
            axios
                .post("/registration/emailVerification", this.code + ";" + this.email)
                .then(response => {
                	this.isAuthenticated = response.data;
                	if(this.isAuthenticated)
            		{
                        swal("Success", "Patient Authenticated Successfully !", "success");
                		this.$router.push("/")
            		}
                    else
                    {
                        swal("Warning !", "Bad Authentification code. Try Again !", "warning");
                    }
                })

        },
        home: function(){
        	this.$router.push("/")
        },
        back : function(){
			this.$router.push("/")
		},
    },
    mounted(){
        this.email = localStorage.getItem('email') 
    },

});