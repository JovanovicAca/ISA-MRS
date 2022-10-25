Vue.component("OrderDrugsHome", {
    data: function() {
        return {

        }
    },
    template: ` 
    <div>
        <div class="page">
        <nav class="page__menu menu">
        <ul class="menu__list r-list">
            <li class="menu__group"><a href="#/orderDrugs" class="menu__link r-link text-underlined">Order drugs</a></li>
            <li class="menu__group"><a href="#/madeOrders" class="menu__link r-link text-underlined">Made orders</a></li>
            <li class="menu__group"><a href="#/acceptOrder" class="menu__link r-link text-underlined">Accept order</a></li>
            <li class="menu__group"><a href="#/pharmaAdminHome" class="menu__link r-link text-underlined">Home</a></li>
        </ul>
        </nav>
        </div>
    </div>		  
    	`,

    methods: {
        makeNewOrder: function() {
            this.$router.push('/orderDrugs')
        },
        lookPastOrders: function() {
            this.$router.push('/madeOrders')
        },
        acceptOrder: function() {
            this.$router.push('/acceptOrder')
        },
        backHome: function() {
            this.$router.push('/pharmaAdminHome')
        }

    },
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