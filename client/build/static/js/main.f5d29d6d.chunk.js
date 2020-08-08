(this.webpackJsonptweetlibs=this.webpackJsonptweetlibs||[]).push([[0],{67:function(e,a,t){e.exports=t(99)},72:function(e,a,t){},96:function(e,a,t){},99:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(22),o=t.n(l),s=(t(72),t(34)),c=t(6),i=t(56),u=t(18),m=t(19),d=t(21),h=t(20),g=t(23),p=t.n(g),E=t(102);var f=function(e){var a=e.error.map((function(e,a){return r.a.createElement("p",{key:a},e)}));return e.error.length>0?r.a.createElement(E.a,{variant:e.variant,onClose:e.clearErrors,dismissible:!0},r.a.createElement(E.a.Heading,null,e.message),r.a.createElement("div",null,a)):r.a.createElement(r.a.Fragment,null)},v=t(108),b=t(109),w=t(57),y=t(107),C=t(106),S=t(103),k=function(e){Object(d.a)(t,e);var a=Object(h.a)(t);function t(){var e;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={firstName:"",lastName:"",email:"",password1:"",password2:"",user_email:"",registered_pass:"",loggedIn:!1,variant:"danger",alert_msg:"",errors:[]},e.handleChange=function(a){var t=a.target.name;e.setState(Object(i.a)({},t,a.target.value))},e.registerApiHandle=function(a){a.preventDefault();var t={firstName:e.state.firstName,lastName:e.state.lastName,email:e.state.email,password1:e.state.password1,password2:e.state.password2};p.a.post("/register",t).then((function(a){if(a.data.msg)if("New account created. You may now log in!"===a.data.msg){var t=[];t.push(a.data.msg),e.setState({errors:t}),e.setState({variant:"success"}),e.setState({alert_msg:"Success"})}else{var n=[];n.push(a.data.msg),e.setState({errors:n}),e.setState({alert_msg:"Error"})}else if(a.data.errors.length>0){var r=[];a.data.errors.forEach((function(e){var a=e.msg;r.push(a)})),e.setState({errors:r}),e.setState({alert_msg:"Error"})}})).catch((function(e){console.log(e)}))},e.loginApiHandle=function(a){a.preventDefault();var t={email:e.state.user_email,password:e.state.registered_pass};p.a.post("/login",t).then((function(a){console.log(a),!0===a.data.loggedIn?(localStorage.setItem("user_id",a.data.id),localStorage.setItem("loggedIn",!0),e.setState({loggedIn:!0}),window.location.reload()):localStorage.setItem("loggedIn",!1)})).catch((function(e){console.log(e)}))},e.clearErrors=function(){e.setState({errors:[]})},e}return Object(m.a)(t,[{key:"render",value:function(){var e=this;return"false"===localStorage.getItem("loggedIn")||!1===this.state.loggedIn?r.a.createElement(v.a.Container,{id:"left-tabs-example",defaultActiveKey:"register"},r.a.createElement(b.a,{className:"m-5"},r.a.createElement(w.a,null,r.a.createElement(y.a,{variant:"pills nav-fill m-4"},r.a.createElement(y.a.Item,null,r.a.createElement(y.a.Link,{eventKey:"register"},"Register")),r.a.createElement(y.a.Item,null,r.a.createElement(y.a.Link,{eventKey:"login"},"Login")))),r.a.createElement(f,{error:this.state.errors,clearErrors:this.clearErrors,variant:this.state.variant,message:this.state.alert_msg}),r.a.createElement(w.a,null,r.a.createElement(v.a.Content,{className:"m-3"},r.a.createElement(v.a.Pane,{eventKey:"register"},r.a.createElement(C.a.Group,null,r.a.createElement(C.a.Label,null,"First Name"),r.a.createElement(C.a.Control,{name:"firstName",placeholder:"First Name",onChange:function(a){return e.handleChange(a)}})),r.a.createElement(C.a.Group,null,r.a.createElement(C.a.Label,null,"Last Name"),r.a.createElement(C.a.Control,{name:"lastName",placeholder:"Last Name",onChange:function(a){return e.handleChange(a)}})),r.a.createElement(C.a.Group,null,r.a.createElement(C.a.Label,null,"Email"),r.a.createElement(C.a.Control,{name:"email",type:"email",placeholder:"Email",onChange:function(a){return e.handleChange(a)}})),r.a.createElement(C.a.Group,null,r.a.createElement(C.a.Label,null,"Password"),r.a.createElement(C.a.Control,{name:"password1",type:"password",placeholder:"Password (must be at least 6 characters)",onChange:function(a){return e.handleChange(a)}})),r.a.createElement(C.a.Group,null,r.a.createElement(C.a.Label,null,"Confirm Password"),r.a.createElement(C.a.Control,{name:"password2",type:"password",placeholder:"Confirm Password",onChange:function(a){return e.handleChange(a)}})),r.a.createElement(S.a,{variant:"primary",type:"submit",onClick:this.registerApiHandle},"Register")),r.a.createElement(v.a.Pane,{eventKey:"login"},r.a.createElement(C.a.Group,null,r.a.createElement(C.a.Label,null,"Email"),r.a.createElement(C.a.Control,{name:"user_email",type:"email",placeholder:"Email",onChange:function(a){return e.handleChange(a)}})),r.a.createElement(C.a.Group,null,r.a.createElement(C.a.Label,null,"Password"),r.a.createElement(C.a.Control,{name:"registered_pass",type:"password",placeholder:"Password",onChange:function(a){return e.handleChange(a)}})),r.a.createElement(S.a,{variant:"primary",type:"submit",onClick:this.loginApiHandle},"Login")))))):r.a.createElement(c.a,{from:"/login",to:"/dashboard"})}}]),t}(n.Component),L=function(e){return r.a.createElement("div",null,r.a.createElement("button",{onClick:e.logOut},"Logout"))},O=function(e){Object(d.a)(t,e);var a=Object(h.a)(t);function t(){var e;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).handleLogout=function(){localStorage.setItem("loggedIn",!1),window.location.reload(),p.a.get("/logout").then((function(e){})).catch((function(e){console.log(e)}))},e}return Object(m.a)(t,[{key:"render",value:function(){return"true"===localStorage.getItem("loggedIn")?r.a.createElement("div",null,r.a.createElement("h1",null,"You are now logged in"),r.a.createElement(L,{logOut:this.handleLogout})):r.a.createElement(c.a,{from:"/dashboard",to:"/login"})}}]),t}(n.Component),I=(t(96),t(44)),N=t.n(I),j=t(61),_=function(e){Object(d.a)(t,e);var a=Object(h.a)(t);function t(){return Object(u.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(C.a.Label,null,this.props.speech),r.a.createElement(C.a.Control,{type:"text",id:this.props.movieKey,onChange:this.props.onchange}))}}]),t}(r.a.Component),F=t(105);var x=function(e){return!0===e.state?r.a.createElement(F.a,{show:e.state,onClose:e.close},r.a.createElement(F.a.Header,null,r.a.createElement(F.a.Title,null,"User Name")),r.a.createElement(F.a.Body,null,e.libbed),r.a.createElement(F.a.Footer,null,r.a.createElement(S.a,{variant:"secondary",onClick:e.close},"Close"),r.a.createElement(S.a,{variant:"primary",onClick:e.close},"Save Changes"))):r.a.createElement(r.a.Fragment,null)},A=function(e){Object(d.a)(t,e);var a=Object(h.a)(t);function t(){var e;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={data:[],user_id:localStorage.getItem("user_id"),show:!1,libbed:""},e.handleClose=function(){e.setState({show:!1})},e.handleShow=function(){e.setState({show:!0})},e.handleOnChange=function(a){var t=a.target,n=t.value,r=t.id;console.log(n,r);var l=e.state.data.find((function(e){return e.key===Number(r)}));l.newWord=n;var o=e.state.data.findIndex((function(e){return e.key===Number(r)})),s=e.state.data;s[o]=l,e.setState({data:s}),console.log(s)},e.handleSubmit=function(){var a={data:e.state.data,id:e.state.user_id};p.a.post("/new-words",a).then((function(a){console.log("Eureka!!",a.data),e.setState({libbed:a.data})})),e.setState({show:!0})},e}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(j.a)(N.a.mark((function e(){var a=this;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("hi"),p.a.get("/get-movies").then((function(e){console.log("brooke is stinky",e.data),a.setState({data:e.data}),a.displayFields()})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"displayFields",value:function(){var e=this;return this.state.data.filter((function(e){return e.flag})).map((function(a,t){return r.a.createElement(_,{key:t,movieKey:a.key,speech:a.partOfSpeech,onchange:e.handleOnChange})}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(x,{show:this.handleShow,close:this.handleClose,state:this.state.show,libbed:this.state.libbed}),r.a.createElement("h2",null,"Fill in the fields, click submit and watch the magic happen!"),this.displayFields(),r.a.createElement(S.a,{variant:"primary",onClick:this.handleSubmit},"Submit")," ")}}]),t}(r.a.Component),K=t(104),P=function(){return r.a.createElement(K.a,null,r.a.createElement("h1",{className:"text-center"},"Hello, world!"),r.a.createElement("h5",null,"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae quas autem maxime omnis, sequi nobis temporibus. Sequi temporibus blanditiis dolor incidunt, nobis quis id officiis ea animi neque non aspernatur."))},G=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{className:"justify-content-end",activeKey:"/home"},r.a.createElement(y.a.Item,null,r.a.createElement(y.a.Link,{href:"/login"},r.a.createElement(S.a,{variant:"primary"},"Login")," ")),r.a.createElement(y.a.Item,null,r.a.createElement(y.a.Link,{href:"/login"},r.a.createElement(S.a,{variant:"danger"},"Logout")))))},H=function(){return r.a.createElement("div",null,r.a.createElement(G,null),r.a.createElement("h1",null,"Checkout the most recent MovieLibs!"),r.a.createElement(P,null))},q=t(66);var B=function(){return r.a.createElement(s.a,null,r.a.createElement(q.a,null,r.a.createElement(c.b,{exact:!0,path:"/",component:H}),r.a.createElement(c.b,{path:"/login",component:k}),r.a.createElement(c.b,{path:"/dashboard",component:O}),r.a.createElement(c.b,{path:"/create",component:A})))};t(98),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[67,1,2]]]);
//# sourceMappingURL=main.f5d29d6d.chunk.js.map