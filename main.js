let carts = document.querySelectorAll('.add_to_cart');
let detail = document.querySelectorAll('.roll');

/* declaring products */
let products = [
	{
		name: 'Original',
		tag: 'Original',
		glaze: 'none',
		rolls: 0,
		description: "Our signature original cinnamon bun! Delivered to your door within the hour, guarenteed fresh and warm! We promise you won't be able to stop eating them!",
		price: 5.99,
		inCart: 0
	},
	{
		name: 'Blackberry',
		tag: 'Blackberry',
		glaze: 'none',
		rolls: 0,
		description: "Our blackberry cinnamon bun! Delivered to your door within the hour, guarenteed fresh and warm! We promise you won't be able to stop eating them!",
		price: 6.99,
		inCart: 0
	},
	{
		name: 'Walnut',
		tag: 'Walnut',
		glaze: 'none',
		rolls: 0,
		description: "Our walnut cinnamon bun! Delivered to your door within the hour, guarenteed fresh and warm! We promise you won't be able to stop eating them!",
		price: 6.99,
		inCart: 0
	},
	{
		name: 'Original Gluten-Free',
		tag: 'Gluten-Free',
		glaze: 'none',
		rolls: 0,
		description: "Our original gluten-free cinnamon bun! Delivered to your door within the hour, guarenteed fresh and warm! We promise you won't be able to stop eating them!",
		price: 5.99,
		inCart: 0
	},
	{
		name: 'Pumpkin Spice',
		tag: 'PumpkinSpice',
		glaze: 'none',
		rolls: 0,
		description: "Our pumpkin spice cinnamon bun! Delivered to your door within the hour, guarenteed fresh and warm! We promise you won't be able to stop eating them!",
		price: 7.99,
		inCart: 0
	},
	{
		name: 'Caramel Pecan',
		tag: 'CaramelPecan',
		glaze: 'none',
		rolls: 0,
		description: "Our caramel pecan cinnamon bun! Delivered to your door within the hour, guarenteed fresh and warm! We promise you won't be able to stop eating them!",
		price: 7.99,
		inCart: 0
	},
]

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click',() => {
		cartCount(products[i]);
		totalCost(products[i]);
	})
}

for (let i=0; i < detail.length; i++) {
	detail[i].addEventListener('click', () => {
		setDetail(products[i]);
	})
}

/* ensures that the cart # indicator loads properly */
function loadCartCount() {
	let productNumber = localStorage.getItem('cartCount');

	if(productNumber) {
		document.querySelector('.cart_icon span').textContent = productNumber;
	}
}

/* updates cart # indicator */
function cartCount(product) {
	let productNumber = localStorage.getItem('cartCount');
	productNumber = parseInt(productNumber);

	if(productNumber) {
		localStorage.setItem('cartCount', productNumber + 1);
		document.querySelector('.cart_icon span').textContent = productNumber + 1;
	}
	else {
		localStorage.setItem('cartCount', 1);
		document.querySelector('.cart_icon span').textContent = 1;
	}

	setItems(product);
}

/* sets items in cart */
function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);

	if(cartItems != null) {
		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	}
	else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');

	if(cartCost != null) {
		cartCost = parseFloat(cartCost);
		localStorage.setItem('totalCost', cartCost + product.price);
	}
	else {
		localStorage.setItem('totalCost', product.price);
	}
}

/* updates product details page with correct details */
function setDetail(product) {
	let detailName = localStorage.setItem("itemName", product.name);
	let detailPrice = localStorage.setItem("itemPrice", product.price);
	let detailDescription = localStorage.setItem("itemDescription", product.description);
}

function loadDetail() {
	let detailName = localStorage.getItem("itemName");
	let productPageCheck = document.querySelector('.left');

	if (productPageCheck) {
		let detailPrice = localStorage.getItem("itemPrice");
		let detailDescription = localStorage.getItem("itemDescription");

		document.querySelector('.left span').textContent = "Flavor: " + detailName;
		document.querySelector('.right span').textContent = detailDescription;
		document.querySelector('.price span').textContent = detailPrice;

		let product_image = document.querySelector('.roll_image');
		if (detailName == "Orginal") {
			product_image.innerHTML = '<img class="roll" src="images/Original.png" alt="picture of original cinnamon roll product" id="blackberry">';
		}
		else if (detailName == "Blackberry") {
			product_image.innerHTML = '<img class="roll" src="images/Blackberry.png" alt="picture of blackberry cinnamon roll product" id="blackberry">';
		}
		else if (detailName == "Walnut") {
			product_image.innerHTML = '<img class="roll" src="images/Walnut.png" alt="picture of walnut cinnamon roll product" id="blackberry">';
		}
		else if (detailName == "Original Gluten-Free") {
			product_image.innerHTML = '<img class="roll" src="images/Gluten-Free.png" alt="picture of original (gluten-free) cinnamon roll product" id="blackberry">';
		}
		else if (detailName == "Pumpkin Spice") {
			product_image.innerHTML = '<img class="roll" src="images/PumpkinSpice.png" alt="picture of pumpkin spice cinnamon roll product" id="blackberry">';
		}
		else if (detailName == "Caramel Pecan") {
			product_image.innerHTML = '<img class="roll" src="images/CaramelPecan.png" alt="picture of carmel pecan cinnamon roll product" id="blackberry">';

		}
	}
}

function displayCart() {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	let cartCost = localStorage.getItem('totalCost');

	let productContainer = document.querySelector(".products");
	if (cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="perProduct">
				<div class="product">
					<img src="images/${item.tag}.png">
					<span>${item.name}</span>
				</div>
				<div class="price">$${item.price}</div>
				<div class="quantity">
					<ion-icon name="arrow-back-circle-outline"></ion-icon>
					<span>${item.inCart}</span>
					<ion-icon name="arrow-forward-circle-outline"></ion-icon>
				</div>
				<div class="total">$${item.inCart * item.price}</div>
				<div class="remove">
					<ion-icon name="trash-outline"></ion-icon>
				</div>
			<div>
			`
		});

		productContainer.innerHTML += `
			<div class="cartTotalContainer">
				<h4 class="cartTotalTitle">
					Cart Total
				</h4>
				<h4 class="cartTotal">
					$${cartCost}
				</h4>
			</div>
		`
	}
}

loadCartCount();
displayCart();
loadDetail();