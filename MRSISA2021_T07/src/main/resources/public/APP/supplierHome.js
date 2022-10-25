Vue.component("SupplierHome", {
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
                <div v-on:click="edit()" class = "emp-home-item">
                        
                    <div class = "emp-home-item-c2" style="background-image: url(RES/IMG/profile.png)">
                    
                    </div>
                    <div class= "emp-home-item-c3">
                    <ul>
                        <li>Edit your personal information</li>
                        <li>Change your password</li>
                    </ul>
                    </div>
                </div>
	    		<div v-on:click="offer()" class = "emp-home-item">
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/offers.png)">
	    			</div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>See incoming pharmacy orders</li>
    				</ul>
	    			</div>
	    		</div>
	    		
				<div v-on:click="list()" class = "emp-home-item">
	    			<div class = "emp-home-item-c2" style="background-image: url(RES/IMG/hs.jpg)">
	    			</div>
	    			<div class= "emp-home-item-c3">
	    			<ul>
    					<li>See your offers</li>
						<li>See your accepted offers</li>
    				</ul>
	    			</div>
	    		</div>

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
        edit: function() {
            this.$router.push("/supplierProfile")
        },
        offer: function() {
            this.$router.push("/supplierAccept")
        },
		list: function() {
            this.$router.push("/supplierOffers")
        },
		logout: function()
        {
        	this.$router.push("/logout")
        }
    }
});