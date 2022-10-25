Vue.component("SupplierOffer",{
	data: function () {
	    return {
	      ap: {

          }, // Return offer
		  res: null,
          offer: {
          id: "",
          },
          supplierOffer: {
                orderId: "", // Id ordera 
                price: "", // Cena ponude
                email: "", // Mail suppliera
                deliveryTime: "",
          }
	    }
       
	},
	    
	    template : ` 
<div>
	    		<h1>Offer you have chosen:</h1>
	    	<div>
	    		<table id="appstable" width="1000px">
					<tr>
                        <th>Drugs</th><th>End Time</th>
                    </tr>

					<tr>
					    <td>{{ap.drugs}}</td><td>{{ap.endTime}}</td></td>
					</tr>
	    		</table>
	    	</div>
            <div id="form">
                <form>
                    <table id="tabela">
                        <tr>
                            <td>Price offer: </td>
                            <td><input type="text" v-model="supplierOffer.price" id="cena"></td>
                        </tr>
                        <tr>
                            <td>Delivery time: </td>
                            <tr>
	    				        <td><input v-model="supplierOffer.deliveryTime" type="datetime-local" id="datum"></td>
	    			        </tr>
                        </tr>
                    </table>
                </form>
            </div>

            <div>
            <button v-on:click="makeOffer()" class="table-back">Make Offer</button>
            </div>
            <div>
            <button v-on:click="goBack()" class="table-back">Back</button>
            </div>
            <div id="dialog" title="Notification">
	    	<p id="dialogMes"></p>
	        </div>			

</div>
`
	,
	methods : {
        isInt: function(value) {
			return !isNaN(value) && 
					parseInt(Number(value)) == value && 
					!isNaN(parseInt(value, 10));
		},		
        makeOffer: function(){
			
            var cena = $('#cena').val();
			var datum = $('#datum').val();

            if(cena==''){
                $('#dialogMes').html('Empty price field!');
                $('#dialog').dialog("open");
                return;
            }
            if(!cena === this.isInt(cena)){
                $('#dialogMes').html('Price field input must be number!');
                $('#dialog').dialog("open");
                return;
            }
            if(datum==''){
                $('#dialogMes').html('Empty date field!');
                $('#dialog').dialog("open");
                return;
            }
            this.supplierOffer.orderId = JSON.parse(localStorage.getItem('offerID'))
            this.user = JSON.parse(localStorage.getItem('user'))
            this.supplierOffer.email = this.user.email
            bool = false
            axios  
                .put("/supplier/makeOffer/", this.supplierOffer)
                .then(response => (bool = response.data))
                if(this.bool){
                    $('#dialogMes').html('Error making offer. Check details and try again');
                    $('#dialog').dialog("open");
                }else{
                    $('#dialogMes').html('Successfully made new offer!');
                    $('#dialog').dialog("open");
                    localStorage.removeItem('offerID')
                    this.$router.push("/supplierHome")
                }
               
                
		},

        load : async function(){
            this.id = JSON.parse(localStorage.getItem('offerID'))
            await axios  
                .get("/supplier/makeOfferPage/" + this.id)
                .then(response => (this.ap = response.data))
                
        },

        goBack: function(){
            localStorage.removeItem('offerID')
            this.$router.push("/supplierAccept")
        },
	},

	mounted(){
        
		this.load()
        try{
			this.user = JSON.parse(localStorage.getItem('user'));
			
			if(this.user.role != "SUPPLY"){
				if(this.user.role === "PATIENT"){
					this.$router.push("/patientHome")
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

	},
	
});