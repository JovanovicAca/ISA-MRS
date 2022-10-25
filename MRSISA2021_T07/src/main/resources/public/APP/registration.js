Vue.component("Registration",{
	data: function () {
	    return {
			user:{
				name: "",
                surname: "",
                email: "",
                password: "",
                address: "",
                city: "",
                country: "",
                number: "",
				role: "PATIENT"
			},		
	    }
	},
	    
	    template : ` 

<div>	    
	<div class="header">
		<a href="" class="welcome">Welcome</a>	
	</div>		  
		<form id="registrationForm">
			<div class="register-block">
				<h1>Register</h1>
				<input type="text" v-model="user.name" placeholder="Name" id="name" />
				<input type="text" v-model="user.surname" placeholder="Surname" id="surname" />
				<input type="email" v-model="user.email" placeholder="Email" id="email" />
				<input type="password" v-model="user.password" placeholder="Password" id="password" />
				<input type="text" v-model="user.address" placeholder="Address" id="address" />
				<input type="text" v-model="user.city" placeholder="City" id="city" />
				<input type="text" v-model="user.country" placeholder="Country" id="country" />
				<input type="text" v-model="user.number" placeholder="Phone number (Only digits)" id="number" />
				<button type="button" v-on:click="submitForm">Submit</button>
			</div>
		</form>	
	</div>	
	
	<div id="dialog" title="Notification">
	<p id="dialogMes"></p>
	</div>		

</div>	  
`
	,
	
	methods: {
		isInt: function(value) {
			return !isNaN(value) && 
					parseInt(Number(value)) == value && 
					!isNaN(parseInt(value, 10));
		},
        submitForm: function() {
			bool: false
			var name = $('#name').val();
			var surname = $('#surname').val();
			var email = $('#email').val();
			var password = $('#password').val();
			var address = $('#address').val();
			var city = $('#city').val();
			var country = $('#country').val();
			var number = $('#number').val();

            
			if(name==''){
				$('#dialogMes').html('Empty name field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(surname==''){
				$('#dialogMes').html('Empty surname field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(email==''){
				$('#dialogMes').html('Empty email field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(password==''){
				$('#dialogMes').html('Empty password field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(address==''){
				$('#dialogMes').html('Empty address field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(city==''){
				$('#dialogMes').html('Empty city field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(country==''){
				$('#dialogMes').html('Empty country field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(number==''){
				$('#dialogMes').html('Empty number field!');
	    		$('#dialog').dialog("open");
				return;
			}
			if(!number === this.isInt(number)){
				$('#dialogMes').html('Number field input must be number!');
				$('#dialog').dialog("open");
				return;
			}
            axios
                .post("/registration/registerUser", this.user)
				.then(response => {
					localStorage.setItem('email', this.user.email)
					this.bool = response.data
					if(this.bool === true)
					{
						this.$router.push("/emailVerification")
					}
					else
					{
						$('#dialogMes').html('You have entered unexisting or taken email address, or made bad inputs! Please try again.');
						$('#dialog').dialog("open");
					}
				})
        }
    },
	mounted(){
        localStorage.removeItem('email')
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