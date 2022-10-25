Vue.component("EditDrugsHome", {
    data: function() {
        return {
            headers: ['Doctor email', 'Date inquiry made', 'Drug code'],
        }
    },
    template: ` 
    <div>
        <div class="page">
        <nav class="page__menu menu">
        <ul class="menu__list r-list">
            <li class="menu__group"><a href="#/editDrugsPharma" class="menu__link r-link text-underlined">Register new drug</a></li>
            <li class="menu__group"><a href="#/promotion" class="menu__link r-link text-underlined">Make promotion</a></li>
            <li class="menu__group"><a href="#/priceList" class="menu__link r-link text-underlined">Price list</a></li>
            <li class="menu__group"><a href="#/pharmaAdminHome" class="menu__link r-link text-underlined">Home</a></li>
        </ul>
        </nav>
        </div>

     
    </div>		  
    	`,
    beforeMount() {
        this.user = JSON.parse(localStorage.getItem('user'))
        try {
            if (this.user.role != "ADMIN") {
                if (this.user.role === "SUPPLY") {
                    this.$router.push("/supplierHome")
                }
                if (this.user.role === "PATIENT") {
                    this.$router.push("/patientHome")

                }
                if (this.user.role === "PHARMA") {
                    this.$router.push("/employeeHome")
                }
                if (this.user.role === "DERMA") {
                    this.$router.push("/employeeHome")
                }
            } else {
                if (this.user.adminType === "SYSTEM") {
                    console.log('aa')
                    this.$router.push("/systemAdminHome")
                }
            }
        } catch {
            this.$router.push("/")
        }
    },
});