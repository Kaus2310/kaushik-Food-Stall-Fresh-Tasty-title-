/* ================= EASY SETTINGS =================
   Change ONLY this number to your food-stall WhatsApp number.
   Enter country code + number, without +, spaces or dashes.
   Example India: 919876543210
==================================================== */
const WHATSAPP_NUMBER = "919999999999";

/* Optional shop settings */
const SHOP_NAME = "Swad Food Stall";
const CURRENCY = "₹";

let cart = JSON.parse(localStorage.getItem("swadCart") || "[]");

function saveCart(){ localStorage.setItem("swadCart", JSON.stringify(cart)); updateCartCount(); }
function updateCartCount(){
  const count = cart.reduce((sum,item)=>sum+item.qty,0);
  const el=document.getElementById("cartCount"); if(el) el.textContent=count;
}
function addToCart(name,price){
  const item=cart.find(x=>x.name===name);
  if(item) item.qty++;
  else cart.push({name,price,qty:1});
  saveCart(); openCart();
}
function changeQty(name,delta){
  const item=cart.find(x=>x.name===name);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0) cart=cart.filter(x=>x.name!==name);
  saveCart(); renderCart(); renderConfirm();
}
function cartTotal(){return cart.reduce((sum,item)=>sum+item.price*item.qty,0)}
function renderCart(){
  const box=document.getElementById("cartItems"), total=document.getElementById("cartTotal");
  if(!box)return;
  if(!cart.length){box.innerHTML='<div class="empty">Your cart is empty.<br>Add something tasty from the menu.</div>'; if(total)total.textContent=CURRENCY+"0"; return;}
  box.innerHTML=cart.map(i=>`<div class="cart-row"><div><strong>${i.name}</strong><br><small>${CURRENCY}${i.price} each</small></div><div class="qty"><button onclick="changeQty('${i.name}',-1)">−</button><span>${i.qty}</span><button onclick="changeQty('${i.name}',1)">+</button></div><strong>${CURRENCY}${i.price*i.qty}</strong></div>`).join("");
  if(total) total.textContent=CURRENCY+cartTotal();
}
function openCart(){renderCart();const m=document.getElementById("cartModal");if(m)m.classList.add("show")}
function closeCart(){const m=document.getElementById("cartModal");if(m)m.classList.remove("show")}
function goToCheckout(){
  if(!cart.length){alert("Please add at least one item.");return}
  window.location.href="confirm.html";
}
function renderConfirm(){
  const box=document.getElementById("confirmItems"), total=document.getElementById("confirmTotal");
  if(!box)return;
  if(!cart.length){box.innerHTML='<div class="empty">No items in your order. <a href="index.html">Go back to menu</a></div>';if(total)total.textContent=CURRENCY+"0";return}
  box.innerHTML=cart.map(i=>`<div class="cart-row"><span>${i.name} × ${i.qty}</span><strong>${CURRENCY}${i.price*i.qty}</strong></div>`).join("");
  if(total)total.textContent=CURRENCY+cartTotal();
}
function getUsers(){return JSON.parse(localStorage.getItem("swadUsers")||"[]")}
function showLogin(){
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("loginTab").classList.add("active");document.getElementById("signupTab").classList.remove("active");
  document.getElementById("authTitle").textContent="Login";document.getElementById("authSub").textContent="Login to continue your order.";
}
function showSignup(){
  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupTab").classList.add("active");document.getElementById("loginTab").classList.remove("active");
  document.getElementById("authTitle").textContent="Create account";document.getElementById("authSub").textContent="Save your details for a faster order.";
}
function signupUser(e){
  e.preventDefault();
  const user={name:document.getElementById("signupName").value.trim(),phone:document.getElementById("signupPhone").value.trim(),email:document.getElementById("signupEmail").value.trim(),password:document.getElementById("signupPassword").value};
  const users=getUsers();
  if(users.some(u=>u.email.toLowerCase()===user.email.toLowerCase())){alert("An account with this email already exists.");return}
  users.push(user);localStorage.setItem("swadUsers",JSON.stringify(users));localStorage.setItem("swadCurrentUser",JSON.stringify(user));
  alert("Account created successfully!"); window.location.href=cart.length?"confirm.html":"index.html";
}
function loginUser(e){
  e.preventDefault();
  const id=document.getElementById("loginId").value.trim().toLowerCase(), pass=document.getElementById("loginPassword").value;
  const user=getUsers().find(u=>(u.email.toLowerCase()===id||u.phone===id)&&u.password===pass);
  if(!user){alert("Incorrect login details. Please try again.");return}
  localStorage.setItem("swadCurrentUser",JSON.stringify(user));
  window.location.href=cart.length?"confirm.html":"index.html";
}
function confirmOrder(e){
  e.preventDefault();
  if(!cart.length){alert("Your cart is empty.");return}
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  const note=document.getElementById("pickupNote").value.trim();
  const lines=cart.map((i,n)=>`${n+1}. ${i.name} x ${i.qty} = ${CURRENCY}${i.price*i.qty}`).join("\n");
  const message=`Hello ${SHOP_NAME}! 👋\n\nI would like to place a takeaway order.\n\nCustomer: ${name}\nMobile: ${phone}\n\nORDER ITEMS:\n${lines}\n\nTOTAL: ${CURRENCY}${cartTotal()}\nPickup note: ${note||"No special note"}\n\nPlease confirm my order.`;
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  localStorage.setItem("lastOrder",JSON.stringify({name,phone,note,items:cart,total:cartTotal(),date:new Date().toISOString()}));
  window.open(url,"_blank");
  localStorage.removeItem("swadCart");cart=[];updateCartCount();
}
document.addEventListener("DOMContentLoaded",()=>{
  updateCartCount();renderCart();renderConfirm();
  const user=JSON.parse(localStorage.getItem("swadCurrentUser")||"null");
  const name=document.getElementById("customerName"),phone=document.getElementById("customerPhone");
  if(user&&name&&phone){name.value=user.name||"";phone.value=user.phone||""}
});
