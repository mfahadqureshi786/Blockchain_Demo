//change the nonce value

function iterateOver(msg,difficulty)
{
for (var i = 0; i < difficulty; i++) {
	if(msg[i]!='0')
		return false;
}
return true;
}
function addBlock()
{
alert("Mining a block");
var lastBlock=document.querySelectorAll("div.block")[document.querySelectorAll("div.block").length -1];
var newBlockNo=document.querySelectorAll('span[name="BlockNo"]')[document.querySelectorAll('span[name="BlockNo"]').length -1].innerText;
newBlockNo=parseInt(newBlockNo)+1;
console.log(newBlockNo);
var newBlock='<div class="block"><div class="blockHead"><label for="BlockNo">Block#</label><span name="BlockNo">1</span><label for="Nonce">Nonce:</label><span name="Nonce">1</span><label for="No. of Transactions">No. of Transactions:</label><span name="No. of Transactions">0</span></div><div class="blockBody">	</div></div>';
var difficulty=document.querySelector('select[name="Difficulty"]').selectedIndex +1;
	var checkProof=false;
var oldProof=parseInt($('[name="Nonce"]')[$('[name="Nonce"]').length -1].innerHTML);
var newProof=1;
var p=new Promise((resolve,reject)=>{

while(!checkProof){
	var problem=newProof*newProof-oldProof*oldProof;
var msg=sha256.hex(problem.toString(10));
if(iterateOver(msg,difficulty))
{console.log("Found proof:"+newProof);
 checkProof=true; }
 else newProof++;
}
if(checkProof==true)
	resolve('Block successfully mined!');
else 
	reject('Block mining failed');
});
p.then((msg)=>
{
$('div.row').append(newBlock);
$('[name="BlockNo"]')[$('[name="BlockNo"]').length -1].innerHTML=newBlockNo;
$('[name="Nonce"]')[$('[name="Nonce"]').length -1].innerHTML=newProof;
	console.log(msg);
	alert(msg);
}).catch((msg)=>
{
	console.log(msg);
	alert(msg);
});

}
function toggle_UTXO_Spent()
{   console.log(this);
	$(this).toggleClass("UTXO_Spent");

}
function addTrasanction()
{   
	var ntran=parseInt($('[name="No. of Transactions"]')[$('[name="No. of Transactions"]').length -1].innerHTML);
	if(ntran<5)
	{
	var from=document.querySelector('input[name="from"]').value;
	var to=document.querySelector('input[name="to"]').value;
	var amount=parseFloat(document.querySelector('input[name="amount"]').value);
	console.log(from);
	console.log(to);
	console.log(amount);
	var div=document.createElement("div");
	div.setAttribute("name","Transaction");
var fromSpan = document.createElement("span");
var textnode = document.createTextNode(from);         // Create a text node
fromSpan.appendChild(textnode);
fromSpan.setAttribute("name","from");


var arrowSpan = document.createElement("span");
textnode = document.createTextNode("->");
arrowSpan.appendChild(textnode);
arrowSpan.style.marginLeft="10px";
arrowSpan.setAttribute("name","arrow");

var toSpan = document.createElement("span");
textnode = document.createTextNode(to);         
toSpan.appendChild(textnode);
toSpan.style.marginLeft="10px";
toSpan.setAttribute("name","to");
var amountSpan = document.createElement("span");
textnode = document.createTextNode(amount);
amountSpan.appendChild(textnode);
amountSpan.style.marginLeft="10px";
amountSpan.setAttribute("name","amount");
div.appendChild(fromSpan);div.appendChild(arrowSpan);div.appendChild(toSpan); div.appendChild(amountSpan); 

    $('div.blockBody')[$('div.blockBody').length -1].appendChild(div);

	ntran++;
	$('[name="No. of Transactions"]')[$('[name="No. of Transactions"]').length -1].innerHTML=ntran;
    
	}
	else
	alert("No. of transactions exceed size limit of 1mb");

document.querySelectorAll("[name='Transaction'] span")[document.querySelectorAll("[name='Transaction'] span").length -1].addEventListener("click",toggle_UTXO_Spent);
}
function walletCalculate()
{   var user=document.querySelector("input[name='user']").value;
	var balance=0.0;
	var froms=document.querySelectorAll("span[name='from']");
	var tos=document.querySelectorAll("span[name='to']");
	var amounts=document.querySelectorAll("span[name='amount']");
    for(var a=0;a<froms.length;a++)
    {
    	camount=parseFloat(amounts[a].innerHTML);
    if(froms[a].innerHTML==user && tos[a].innerHTML!=user)
    	balance-=camount;
    else if(froms[a].innerHTML!=user && tos[a].innerHTML==user)
    	balance+=camount;
    }
    document.querySelector("input[name='balance']").value=balance;
    console.log(balance);
}