var bt=Object.defineProperty;var xt=(n,t,e)=>t in n?bt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var g=(n,t,e)=>xt(n,typeof t!="symbol"?t+"":t,e);import{r as At}from"./pwa-DnKWYNr0.js";import{F as wt}from"./loop-9RYcbCcn.js";import{v,g as Z,h as P,l as w,w as D,i as B,j as ht,k as X,c as T,C as kt,a as H,e as St,f as _t,n as ct,s as S,d as Q,b as z,m as Et}from"./draw-rink-CmJacnwV.js";import{b as $t,m as Mt,d as q,i as Ct,a as Lt,c as Pt}from"./puck-DvmshfKo.js";const j=()=>({move:v(),blade:v(),shoot:0,stop:!1,reset:!1,speedUp:!1,speedDown:!1,togglePace:!1,source:"none"});function tt(n,t,e,i){const s=Math.hypot(n,t);if(s<e)return v();const o=Math.min(1,(s-e)/(1-e)),a=Math.pow(o,i)/s;return v(n*a,t*a)}const $={A:0,Y:3,RB:5,LT:6,RT:7,SELECT:8,START:9,UP:12,DOWN:13};function et(n){return n.buttons.some(t=>t.pressed||t.value>.3)||n.axes.some(t=>Math.abs(t)>.3)}class Ft{constructor(){g(this,"prev",[]);g(this,"lastActiveAt",new Map);g(this,"activeIndex",null);g(this,"name",null);g(this,"mapping","");g(this,"status","none");g(this,"seen",[]);g(this,"lastActivity",-1/0)}poll(){let t;try{if(!window.isSecureContext)return this.status="insecure",null;if(!navigator.getGamepads)return this.status="unsupported",null;t=Array.from(navigator.getGamepads())}catch{return this.status="unsupported",null}const e=performance.now(),i=t.filter(c=>!!c&&c.connected);this.seen=i.map(c=>`${c.index}: ${c.id}${c.mapping==="standard"?"":" (non-standard)"}`);for(const c of i)et(c)&&this.lastActiveAt.set(c.index,e);const s=c=>(this.lastActiveAt.get(c.index)??-1/0)+(c.mapping==="standard"?.5:0),o=i.sort((c,u)=>s(u)-s(c))[0];if(!o)return this.status="none",this.name=null,null;this.status="connected",o.index!==this.activeIndex&&(this.activeIndex=o.index,this.prev=[]),this.name=o.id,this.mapping=o.mapping,et(o)&&(this.lastActivity=e);const a=o.buttons.map(c=>c.pressed),l=c=>!!a[c]&&!this.prev[c],h=c=>{var u;return((u=o.buttons[c])==null?void 0:u.value)??0},r=j();return r.move=tt(o.axes[0]??0,-(o.axes[1]??0),.15,1.4),r.blade=tt(o.axes[2]??0,-(o.axes[3]??0),.12,1),r.shoot=Math.max(h($.RT),h($.RB)),r.stop=!!a[$.A]||h($.LT)>.5,r.reset=l($.Y)||l($.START),r.speedUp=l($.UP),r.speedDown=l($.DOWN),r.togglePace=l($.SELECT),r.source="gamepad",this.prev=a,r}}class Dt{constructor(t,e){g(this,"down",new Set);g(this,"pressed",new Set);g(this,"mouseScreen",null);g(this,"lastActivity",-1/0);this.toWorld=e,window.addEventListener("keydown",i=>{i.repeat||this.pressed.add(i.code),this.down.add(i.code),this.lastActivity=performance.now(),i.code==="Space"&&i.preventDefault()}),window.addEventListener("keyup",i=>this.down.delete(i.code)),window.addEventListener("blur",()=>this.down.clear()),t.addEventListener("mousemove",i=>{this.mouseScreen=v(i.clientX,i.clientY),Math.hypot(i.movementX,i.movementY)>3&&(this.lastActivity=performance.now())}),t.addEventListener("mouseleave",()=>this.mouseScreen=null)}poll(t,e){const i=o=>this.down.has(o),s=j();if(s.move=Z(v((i("KeyD")?1:0)-(i("KeyA")?1:0),(i("KeyW")?1:0)-(i("KeyS")?1:0)),1),this.mouseScreen){const o=this.toWorld(this.mouseScreen.x,this.mouseScreen.y),a=v(o.x-t.x,o.y-t.y);s.blade=Z(v(a.x/e,a.y/e),1)}return s.shoot=i("Space")?1:0,s.stop=i("ShiftLeft")||i("ShiftRight"),s.reset=this.pressed.has("KeyR"),s.speedUp=this.pressed.has("Equal")||this.pressed.has("NumpadAdd"),s.speedDown=this.pressed.has("Minus")||this.pressed.has("NumpadSubtract"),s.togglePace=this.pressed.has("KeyP"),s.source="keyboard",this.pressed.clear(),s}}function Tt(n){return{pos:T(n),vel:v(),prevPos:T(n),target:T(n)}}const dt=n=>n.stick.handedness==="left"?1:-1;function Rt(n,t){const e=P(t.stick.forehandLimit),i=-P(t.stick.backhandLimit);if(n<=e&&n>=i)return n;const s=Math.abs(D(n-e)),o=Math.abs(D(n-i));return s<=o?e:i}const It=(n,t)=>t.stick.maxReach*(1-.35*Math.min(1,Math.abs(n)/Math.PI));function Y(n,t,e,i){const s=dt(i),o=P(i.stick.restAngle);let a=o,l=i.stick.restRadius;if(e>0)a=o+P(45)*e,l=i.stick.restRadius-.1*e;else{const h=Math.min(1,w(t));if(h>.01){const r=Rt(D((B(t)-n.facing)*s),i);a=o+(r-o)*h,l=i.stick.restRadius+(It(r,i)-i.stick.restRadius)*h}}return ht(n.pos,X(n.facing+a*s,l))}function Ot(n,t,e,i,s){const o=s.stick;n.target=e;let a=o.stiffness*(e.x-n.pos.x)+o.damping*(t.vel.x-n.vel.x),l=o.stiffness*(e.y-n.pos.y)+o.damping*(t.vel.y-n.vel.y);const h=Math.hypot(a,l);h>o.maxAccel&&(a*=o.maxAccel/h,l*=o.maxAccel/h),n.vel.x+=a*i,n.vel.y+=l*i;const r=n.vel.x-t.vel.x,c=n.vel.y-t.vel.y,u=Math.hypot(r,c);u>o.maxSpeed&&(n.vel.x=t.vel.x+r*o.maxSpeed/u,n.vel.y=t.vel.y+c*o.maxSpeed/u),n.pos.x+=n.vel.x*i,n.pos.y+=n.vel.y*i;const f=n.pos.x-t.pos.x,m=n.pos.y-t.pos.y,y=Math.hypot(f,m),b=o.maxReach;if(y>b){const k=f/y,p=m/y;n.pos.x=t.pos.x+k*b,n.pos.y=t.pos.y+p*b;const d=(n.vel.x-t.vel.x)*k+(n.vel.y-t.vel.y)*p;d>0&&(n.vel.x-=d*k,n.vel.y-=d*p)}}const Vt="#1f4fa8",Bt="#ffffff";class Ht{constructor(t,e){g(this,"camera",new kt);g(this,"ctx");g(this,"dpr",1);g(this,"trail",[]);g(this,"snow",[]);this.canvas=t,this.p=e,this.ctx=t.getContext("2d"),this.resize(),window.addEventListener("resize",()=>this.resize())}resize(){this.dpr=window.devicePixelRatio||1;const t=window.innerWidth,e=window.innerHeight;this.canvas.width=Math.round(t*this.dpr),this.canvas.height=Math.round(e*this.dpr),this.camera.resize(t,e,this.p.render.viewHeight)}draw(t,e,i,s){const{ctx:o,p:a}=this;this.camera.height!==window.innerHeight&&this.resize();const l=t.player,h=H(l.prevPos,l.pos,e),r=l.prevFacing+D(l.facing-l.prevFacing)*e,c=H(t.blade.prevPos,t.blade.pos,e),u=H(t.puck.prevPos,t.puck.pos,e),f=v(h.x+l.vel.x*.35+(u.x-h.x)*.25,h.y+l.vel.y*.35+(u.y-h.y)*.25);this.camera.follow(f,i),o.setTransform(1,0,0,1,0,0),o.fillStyle="#1d232b",o.fillRect(0,0,this.canvas.width,this.canvas.height),this.camera.apply(o,this.dpr),St(o),_t(o,t.net,t.goalTimer>0?t.goalTimer/2:0),this.updateSnow(t,h,r,s),this.drawSnow(),this.drawPuck(u,t.puck.state==="loose"?Math.hypot(t.puck.vel.x,t.puck.vel.y):0),this.drawPlayer(h,r,c),t.charging&&this.drawAim(u,t.aim,t.charge),a.render.debugOverlay&&this.drawDebug(t,h,c)}drawPlayer(t,e,i){const{ctx:s,p:o}=this,a=dt(o),l=v(t.x+Math.cos(e+P(55)*a)*.32,t.y+Math.sin(e+P(55)*a)*.32);s.fillStyle="rgba(20, 30, 45, 0.18)",s.beginPath(),s.ellipse(t.x+.08,t.y-.1,.42,.36,e,0,Math.PI*2),s.fill();const h=i.x-l.x,r=i.y-l.y,c=Math.hypot(h,r)||1,u=-r/c,f=h/c;s.lineCap="round",s.strokeStyle="#2b2b2b",s.lineWidth=.05,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(i.x,i.y),s.stroke(),s.lineWidth=.075,s.strokeStyle="#111",s.beginPath(),s.moveTo(i.x+u*.04*a,i.y+f*.04*a),s.lineTo(i.x-u*.2*a+h/c*.05,i.y-f*.2*a+r/c*.05),s.stroke(),s.save(),s.translate(t.x,t.y),s.rotate(e),s.fillStyle=Vt,s.beginPath(),s.ellipse(0,0,.2,.34,0,0,Math.PI*2),s.fill(),s.strokeStyle=Bt,s.lineWidth=.04,s.stroke(),s.fillStyle="#16213a",s.beginPath(),s.arc(.22,.2*a,.08,0,Math.PI*2),s.arc(.1,-.22*a,.07,0,Math.PI*2),s.fill(),s.fillStyle="#0f1b33",s.beginPath(),s.arc(.02,0,.13,0,Math.PI*2),s.fill(),s.fillStyle="rgba(190, 220, 255, 0.8)",s.beginPath(),s.arc(.02,0,.13,-.6,.6),s.lineTo(.02,0),s.fill(),s.restore()}drawPuck(t,e){const{ctx:i,p:s}=this,o=s.render.puckRadius,a=this.trail[this.trail.length-1];if(a&&Math.hypot(t.x-a.x,t.y-a.y)>1.5&&(this.trail.length=0),this.trail.push({x:t.x,y:t.y}),this.trail.length>10&&this.trail.shift(),e>8){i.lineCap="round";for(let l=1;l<this.trail.length;l++){const h=this.trail[l-1],r=this.trail[l];i.strokeStyle=`rgba(30, 40, 55, ${l/this.trail.length*.35})`,i.lineWidth=o*2*(l/this.trail.length),i.beginPath(),i.moveTo(h.x,h.y),i.lineTo(r.x,r.y),i.stroke()}}i.fillStyle="rgba(20, 30, 45, 0.22)",i.beginPath(),i.arc(t.x+.03,t.y-.03,o,0,Math.PI*2),i.fill(),i.fillStyle="#0a0a0a",i.beginPath(),i.arc(t.x,t.y,o,0,Math.PI*2),i.fill()}drawAim(t,e,i){const{ctx:s}=this,o=1.5+i*4,a=v(t.x+e.x*o,t.y+e.y*o);s.strokeStyle=`rgba(255, 170, 40, ${.35+i*.5})`,s.lineWidth=.06+i*.06,s.setLineDash([.25,.15]),s.beginPath(),s.moveTo(t.x,t.y),s.lineTo(a.x,a.y),s.stroke(),s.setLineDash([])}updateSnow(t,e,i,s){const o=t.player,a=Math.hypot(o.vel.x,o.vel.y);if(o.stopping&&a>2){const l=Math.ceil(s*180*Math.min(1,a/8));for(let h=0;h<l;h++){const r=X(i+(Math.random()-.5)*1.6,1);this.snow.push({pos:v(e.x+r.x*.25,e.y+r.y*.25),vel:v(o.vel.x*.6+r.x*2*Math.random(),o.vel.y*.6+r.y*2*Math.random()),life:.5+Math.random()*.4})}}for(const l of this.snow)l.pos.x+=l.vel.x*s,l.pos.y+=l.vel.y*s,l.vel.x*=Math.exp(-5*s),l.vel.y*=Math.exp(-5*s),l.life-=s;this.snow=this.snow.filter(l=>l.life>0)}drawSnow(){const{ctx:t}=this;for(const e of this.snow)t.fillStyle=`rgba(255, 255, 255, ${Math.min(1,e.life*2)})`,t.beginPath(),t.arc(e.pos.x,e.pos.y,.05,0,Math.PI*2),t.fill()}drawDebug(t,e,i){const{ctx:s,p:o}=this;s.lineWidth=.02,s.strokeStyle="rgba(0, 160, 80, 0.8)",s.beginPath(),s.arc(i.x,i.y,o.puck.captureRadius,0,Math.PI*2),s.stroke(),s.strokeStyle="rgba(220, 60, 60, 0.6)",s.beginPath(),s.arc(i.x,i.y,o.puck.breakDistance,0,Math.PI*2),s.stroke();const a=t.blade.target;s.strokeStyle="#a020f0",s.beginPath(),s.moveTo(a.x-.1,a.y-.1),s.lineTo(a.x+.1,a.y+.1),s.moveTo(a.x-.1,a.y+.1),s.lineTo(a.x+.1,a.y-.1),s.stroke(),s.strokeStyle="rgba(0,0,0,0.15)",s.beginPath(),s.arc(e.x,e.y,o.stick.maxReach,0,Math.PI*2),s.stroke(),s.strokeStyle="#0077cc",s.lineWidth=.04,s.beginPath(),s.moveTo(e.x,e.y),s.lineTo(e.x+t.player.vel.x*.3,e.y+t.player.vel.y*.3),s.stroke()}}const x={game:{timeScale:1},skate:{speedScale:1,maxSpeed:9,accel:7,edgeGrip:3,carveKeep:.6,glide:.08,stopDecel:14,turnRate:7,radius:.32},stick:{handedness:"left",restAngle:25,restRadius:1,maxReach:1.65,forehandLimit:150,backhandLimit:110,stiffness:900,damping:60,maxAccel:320,maxSpeed:14},puck:{radius:.038,friction:.45,drag:.004,boardRestitution:.5,boardTangent:.85,postRestitution:.6,netRestitution:.1,captureRadius:.28,captureRelSpeed:7,cradleStiffness:420,cradleDamping:38,breakDistance:.38,recaptureCooldown:.25},shot:{flickWindow:.3,flickMinSpeed:17,flickMaxSpeed:31,chargeTime:.8,chargedMinSpeed:20,chargedMaxSpeed:42,lateralPenalty:.3},render:{puckRadius:.09,viewHeight:16,debugOverlay:!1}},G=[.25,.5,.75,1],ut={hockey:{speedScale:1,puckFriction:.45,shotScale:1},floorball:{speedScale:.6,puckFriction:1.6,shotScale:.75}},O={...x.shot};function pt(n,t=x){const e=ut[n];t.skate.speedScale=e.speedScale,t.puck.friction=e.puckFriction,t.shot.flickMinSpeed=O.flickMinSpeed*e.shotScale,t.shot.flickMaxSpeed=O.flickMaxSpeed*e.shotScale,t.shot.chargedMinSpeed=O.chargedMinSpeed*e.shotScale,t.shot.chargedMaxSpeed=O.chargedMaxSpeed*e.shotScale}class zt{constructor(){g(this,"backAt",-1/0)}update(t,e,i,s){const o=w(t);if(o<.7)return null;const a=Math.abs(D(B(t)-e));if(a>P(115))return this.backAt=i,null;const l=i-this.backAt;return o>.85&&a<P(35)&&l<=s.shot.flickWindow?(this.backAt=-1/0,{dir:ct(t),power:Math.max(0,Math.min(1,1-l/s.shot.flickWindow))}):null}}const it=(n,t,e)=>n+(t-n)*e;function Yt(n=v(),t=0){return{pos:T(n),vel:v(),prevPos:T(n),facing:t,prevFacing:t,stopping:!1}}function Gt(n,t,e,i,s){const o=s.skate,a=o.maxSpeed*o.speedScale,l=o.accel*o.speedScale,h=Math.min(1,w(t)),r=n.vel;if(n.stopping=e&&w(r)>.3,e){const m=w(r),y=Math.max(0,m-o.stopDecel*o.speedScale*i);m>0&&(r.x*=y/m,r.y*=y/m)}else if(h>.05){const m=t.x/w(t),y=t.y/w(t),b=r.x*m+r.y*y,k=r.x-b*m,p=r.y-b*y,d=Math.min(1,o.edgeGrip*h*i),A=Math.hypot(k,p)*d;r.x-=k*d,r.y-=p*d;const F=b>0?A*o.carveKeep:0,I=l*h*Math.max(0,Math.min(1,1-b/(a*h)));r.x+=m*(I*i+F),r.y+=y*(I*i+F)}const c=Math.exp(-o.glide*i);r.x*=c,r.y*=c;const u=w(r);if(u>a){const m=Math.max(a,u-6*i);r.x*=m/u,r.y*=m/u}n.pos.x+=r.x*i,n.pos.y+=r.y*i;let f=null;if(h>.3&&!e?f=B(t):w(r)>1&&(f=B(r)),f!==null){const m=D(f-n.facing),y=o.turnRate*i;n.facing=D(n.facing+Math.max(-y,Math.min(y,m)))}}class Wt{constructor(t=x){g(this,"player");g(this,"blade");g(this,"puck");g(this,"net");g(this,"time",0);g(this,"charging",!1);g(this,"charge",0);g(this,"goals",0);g(this,"shots",0);g(this,"lastShot",null);g(this,"goalTimer",0);g(this,"aim",v(1,0));g(this,"events",[]);this.p=t,this.player=Yt(v(-2,0),0);const e=Y(this.player,v(),0,t);this.blade=Tt(e),this.puck=$t(e),this.puck.state="cradled",this.net=Mt(1)}placePlayer(t,e=0){const i=this.player;S(i.pos,t),S(i.prevPos,t),i.vel=v(),i.facing=i.prevFacing=e;const s=Y(i,v(),0,this.p);S(this.blade.pos,s),S(this.blade.prevPos,s),this.blade.vel=v(),this.resetPuck()}resetPuck(){S(this.puck.pos,this.blade.pos),S(this.puck.prevPos,this.blade.pos),S(this.puck.vel,this.blade.vel),this.puck.state="cradled",this.puck.cooldown=0,this.goalTimer=0}get puckOnBlade(){return this.puck.state==="cradled"||this.puck.cooldown<=0&&Q(this.puck.pos,this.blade.pos)<this.p.puck.captureRadius*1.3}step(t,e){const{player:i,blade:s,puck:o,p:a}=this;this.time+=t,S(i.prevPos,i.pos),i.prevFacing=i.facing,S(s.prevPos,s.pos),S(o.prevPos,o.pos),Gt(i,e.move,e.stop,t,a),z(i.pos,i.vel,a.skate.radius,.2,.95),q(this.net,i.pos,i.vel,a.skate.radius,i.prevPos,.2,.1),e.shoot>.5&&!this.charging&&(this.charging=!0,this.charge=0),this.charging&&(this.charge=Math.min(1,this.charge+t/a.shot.chargeTime),this.aim=w(e.blade)>.35?ct(e.blade):X(i.facing)),Ot(s,i,Y(i,e.blade,this.charging?this.charge:0,a),t,a),z(s.pos,s.vel,.05,0,.9),this.charging&&e.shoot<.3?(this.puckOnBlade&&this.fire(this.aim,it(a.shot.chargedMinSpeed,a.shot.chargedMaxSpeed,this.charge),"charged"),this.charging=!1,this.charge=0):e.flick&&!this.charging&&this.puckOnBlade&&this.fire(e.flick.dir,it(a.shot.flickMinSpeed,a.shot.flickMaxSpeed,e.flick.power),"flick"),this.stepPuck(t),this.goalTimer>0&&(this.goalTimer-=t,this.goalTimer<=0&&this.resetPuck())}fire(t,e,i){const{player:s,puck:o,p:a}=this,l=Math.abs(s.vel.x*t.y-s.vel.y*t.x)/a.skate.maxSpeed,h=e*(1-a.shot.lateralPenalty*Math.min(1,l));S(o.vel,ht(Et(t,h),s.vel)),o.state="loose",o.cooldown=a.puck.recaptureCooldown,this.shots++;const r=w(o.vel)*3.6;this.lastShot={kind:i,speed:r},this.events.push({type:"shot",kind:i,speed:r})}stepPuck(t){const{puck:e,blade:i,player:s,p:o}=this,a=o.puck,l=a.radius,h=Math.max(w(e.vel),w(i.vel)),r=Math.min(32,Math.max(1,Math.ceil(h*t/l))),c=t/r,u=v();for(let m=0;m<r;m++){if(S(u,e.pos),e.state==="cradled"){const b=(m+1)/r,k=i.prevPos.x+(i.pos.x-i.prevPos.x)*b,p=i.prevPos.y+(i.pos.y-i.prevPos.y)*b;e.vel.x+=(a.cradleStiffness*(k-e.pos.x)+a.cradleDamping*(i.vel.x-e.vel.x))*c,e.vel.y+=(a.cradleStiffness*(p-e.pos.y)+a.cradleDamping*(i.vel.y-e.vel.y))*c}else{const b=Ct(this.net,e.pos)?30:a.friction;Lt(e.vel,b,a.drag,c)}e.pos.x+=e.vel.x*c,e.pos.y+=e.vel.y*c;const y=T(e.vel);z(e.pos,e.vel,l,a.boardRestitution,a.boardTangent),q(this.net,e.pos,e.vel,l,u,a.postRestitution,a.netRestitution)&&w(y)>8&&Math.abs(e.pos.x-this.net.goalX)<.08&&this.events.push({type:"post"}),this.goalTimer<=0&&Pt(this.net,u,e.pos,l)&&(this.goals++,this.goalTimer=2,this.events.push({type:"goal"}),e.state==="cradled"&&(e.state="loose",e.cooldown=2)),e.state==="loose"&&e.cooldown<=0&&this.bounceOffSkater(s)}e.cooldown=Math.max(0,e.cooldown-t);const f=Q(e.pos,i.pos);e.state==="cradled"?f>a.breakDistance&&(e.state="loose",e.cooldown=.12,this.events.push({type:"lost"})):e.cooldown<=0&&this.goalTimer<=0&&f<a.captureRadius&&Math.hypot(e.vel.x-i.vel.x,e.vel.y-i.vel.y)<a.captureRelSpeed&&(e.state="cradled")}bounceOffSkater(t){const{puck:e}=this,i=this.p.skate.radius+this.p.puck.radius,s=e.pos.x-t.pos.x,o=e.pos.y-t.pos.y,a=Math.hypot(s,o);if(a>=i||a<1e-6)return;const l=s/a,h=o/a;e.pos.x=t.pos.x+l*i,e.pos.y=t.pos.y+h*i;const r=(e.vel.x-t.vel.x)*l+(e.vel.y-t.vel.y)*h;r<0&&(e.vel.x-=1.3*r*l,e.vel.y-=1.3*r*h)}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class E{constructor(t,e,i,s,o="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),E.nextNameID=E.nextNameID||0,this.$name.id=`lil-gui-name-${++E.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Nt extends E{constructor(t,e,i){super(t,e,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function N(n){let t,e;return(t=n.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const Kt={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:N,toHexString:N},R={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},Xt={isPrimitive:!1,match:n=>Array.isArray(n),fromHexString(n,t,e=1){const i=R.fromHexString(n);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([n,t,e],i=1){i=255/i;const s=n*i<<16^t*i<<8^e*i<<0;return R.toHexString(s)}},jt={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,t,e=1){const i=R.fromHexString(n);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r:n,g:t,b:e},i=1){i=255/i;const s=n*i<<16^t*i<<8^e*i<<0;return R.toHexString(s)}},Jt=[Kt,R,Xt,jt];function Ut(n){return Jt.find(t=>t.match(n))}class Zt extends E{constructor(t,e,i,s){super(t,e,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ut(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=N(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class W extends E{constructor(t,e,i){super(t,e,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Qt extends E{constructor(t,e,i,s,o,a){super(t,e,i,"number"),this._initInput(),this.min(s),this.max(o);const l=a!==void 0;this.step(l?a:this._getImplicitStep(),l),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let d=parseFloat(this.$input.value);isNaN(d)||(this._stepExplicit&&(d=this._snap(d)),this.setValue(this._clamp(d)))},i=d=>{const A=parseFloat(this.$input.value);isNaN(A)||(this._snapClampSetValue(A+d),this.$input.value=this.getValue())},s=d=>{d.key==="Enter"&&this.$input.blur(),d.code==="ArrowUp"&&(d.preventDefault(),i(this._step*this._arrowKeyMultiplier(d))),d.code==="ArrowDown"&&(d.preventDefault(),i(this._step*this._arrowKeyMultiplier(d)*-1))},o=d=>{this._inputFocused&&(d.preventDefault(),i(this._step*this._normalizeMouseWheel(d)))};let a=!1,l,h,r,c,u;const f=5,m=d=>{l=d.clientX,h=r=d.clientY,a=!0,c=this.getValue(),u=0,window.addEventListener("mousemove",y),window.addEventListener("mouseup",b)},y=d=>{if(a){const A=d.clientX-l,F=d.clientY-h;Math.abs(F)>f?(d.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(A)>f&&b()}if(!a){const A=d.clientY-r;u-=A*this._step*this._arrowKeyMultiplier(d),c+u>this._max?u=this._max-c:c+u<this._min&&(u=this._min-c),this._snapClampSetValue(c+u)}r=d.clientY},b=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",b)},k=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",k),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=(p,d,A,F,I)=>(p-d)/(A-d)*(I-F)+F,e=p=>{const d=this.$slider.getBoundingClientRect();let A=t(p,d.left,d.right,this._min,this._max);this._snapClampSetValue(A)},i=p=>{this._setDraggingStyle(!0),e(p.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",o)},s=p=>{e(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",o)};let a=!1,l,h;const r=p=>{p.preventDefault(),this._setDraggingStyle(!0),e(p.touches[0].clientX),a=!1},c=p=>{p.touches.length>1||(this._hasScrollBar?(l=p.touches[0].clientX,h=p.touches[0].clientY,a=!0):r(p),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",f))},u=p=>{if(a){const d=p.touches[0].clientX-l,A=p.touches[0].clientY-h;Math.abs(d)>Math.abs(A)?r(p):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",f))}else p.preventDefault(),e(p.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",f)},m=this._callOnFinishChange.bind(this),y=400;let b;const k=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const A=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+A),this.$input.value=this.getValue(),clearTimeout(b),b=setTimeout(m,y)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",k,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class qt extends E{constructor(t,e,i,s){super(t,e,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class te extends E{constructor(t,e,i){super(t,e,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var ee=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function ie(n){const t=document.createElement("style");t.innerHTML=n;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let st=!1;class J{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:s,title:o="Controls",closeFolders:a=!1,injectStyles:l=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),h&&this.domElement.classList.add("allow-touch-styles"),!st&&l&&(ie(ee),st=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=a}add(t,e,i,s,o){if(Object(i)===i)return new qt(this,t,e,i);const a=t[e];switch(typeof a){case"number":return new Qt(this,t,e,i,s,o);case"boolean":return new Nt(this,t,e);case"string":return new te(this,t,e);case"function":return new W(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,a)}addColor(t,e,i=1){return new Zt(this,t,e,i)}addFolder(t){const e=new J({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof W||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof W)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const i=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}function se(n,t){const e=new J({title:"Tuning"}),i=e.addFolder("Game speed");i.add(n.game,"timeScale",.1,1,.05).name("time scale").listen().onChange(t.onSpeedChange),i.add(n.skate,"speedScale",.3,1.3,.05).name("skating speed").listen().onChange(t.onSpeedChange);const s={pace:t.getPace()};i.add(s,"pace",Object.keys(ut)).name("pace preset").onChange(c=>t.setPace(c));const o=e.addFolder("Skating").close();o.add(n.skate,"maxSpeed",3,14,.1),o.add(n.skate,"accel",1,20,.1),o.add(n.skate,"edgeGrip",.5,10,.1),o.add(n.skate,"carveKeep",0,1,.05),o.add(n.skate,"glide",0,1,.01),o.add(n.skate,"stopDecel",2,30,.5),o.add(n.skate,"turnRate",1,20,.5);const a=e.addFolder("Stick").close();a.add(n.stick,"handedness",["left","right"]),a.add(n.stick,"restAngle",-60,90,1),a.add(n.stick,"restRadius",.5,1.6,.05),a.add(n.stick,"maxReach",1,2.2,.05),a.add(n.stick,"forehandLimit",60,180,1),a.add(n.stick,"backhandLimit",30,180,1),a.add(n.stick,"stiffness",100,3e3,10),a.add(n.stick,"damping",5,150,1),a.add(n.stick,"maxAccel",50,800,10),a.add(n.stick,"maxSpeed",3,30,.5);const l=e.addFolder("Puck control").close();l.add(n.puck,"captureRadius",.1,.6,.01),l.add(n.puck,"captureRelSpeed",1,20,.5),l.add(n.puck,"cradleStiffness",50,1500,10),l.add(n.puck,"cradleDamping",2,100,1),l.add(n.puck,"breakDistance",.15,1,.01),l.add(n.puck,"friction",0,3,.05).listen(),l.add(n.puck,"boardRestitution",0,1,.05);const h=e.addFolder("Shooting").close();h.add(n.shot,"flickWindow",.1,.6,.01),h.add(n.shot,"flickMinSpeed",5,40,.5).listen(),h.add(n.shot,"flickMaxSpeed",5,45,.5).listen(),h.add(n.shot,"chargeTime",.2,2,.05),h.add(n.shot,"chargedMinSpeed",5,45,.5).listen(),h.add(n.shot,"chargedMaxSpeed",10,55,.5).listen(),h.add(n.shot,"lateralPenalty",0,1,.05);const r=e.addFolder("View").close();return r.add(n.render,"viewHeight",8,30,.5).name("zoom (m visible)").onChange(()=>window.dispatchEvent(new Event("resize"))),r.add(n.render,"puckRadius",.038,.15,.005),r.add(n.render,"debugOverlay").name("debug overlay"),e}class ne{constructor(t,e,i){g(this,"last",0);this.el=t,this.help=e,this.banner=i,this.help.innerHTML=["<b>Gamepad</b>: L-stick skate · R-stick stick blade · pull R-stick back → push forward = wrist shot","hold <b>RT</b> charge shot (R-stick aims) · <b>A</b>/LT stop · <b>Y</b> reset puck · <b>D-pad ↑↓</b> game speed · <b>Back</b> pace preset","<b>Keyboard</b>: WASD skate · mouse = blade · Space charge · Shift stop · R reset · +/− speed · P pace"].join("<br>")}flash(t){this.banner.textContent=t,this.banner.classList.add("show"),window.setTimeout(()=>this.banner.classList.remove("show"),1200)}padRow(t){const e=i=>`<div class="warn">${i}</div>`;switch(t.status){case"insecure":return e(`Gamepads are blocked on this address (not a secure context).<br>Open <b>http://localhost:${location.port}</b> instead.`);case"unsupported":return e("This browser does not support gamepads.");case"none":return e("No gamepad yet — press a button on it.");case"connected":{const i=t.seen.length>1?`<div class="label">devices: ${t.seen.map(nt).join("<br>")}</div>`:"",s=t.mapping==="standard"?"":e("Non-standard button layout — buttons may be mixed up.");return`<div class="label">Pad: ${nt(t.name??"")}</div>${s}${i}`}}}update(t,e,i,s,o,a){if(a-this.last<.1)return;this.last=a;const l=Math.hypot(t.player.vel.x,t.player.vel.y)*3.6,h=t.lastShot?`${t.lastShot.speed.toFixed(0)} km/h <span class="label">${t.lastShot.kind}</span>`:"—",r=t.goalTimer>0?"goal!":t.puck.state==="cradled"?"on stick":"loose",c=(u,f,m="")=>`<div class="row"><span class="label">${u}</span><span class="${m}">${f}</span></div>`;this.el.innerHTML=[c("Game speed",`${Math.round(e.game.timeScale*100)}%`,"speed"),c("Pace",`${i} · skate ${Math.round(e.skate.speedScale*100)}%`),c("Goals / shots",`${t.goals} / ${t.shots}`),c("Last shot",h),c("Skating",`${l.toFixed(0)} km/h`),c("Puck",r),c("Using",o==="gamepad"?"gamepad":"keyboard / mouse"),this.padRow(s)].join("")}}const nt=n=>n.replace(/[&<>"]/g,t=>`&#${t.charCodeAt(0)};`),gt="hockey-trainer:speed";function ae(n){try{const t=localStorage.getItem(gt);if(!t)return"hockey";const e=JSON.parse(t),i=e.pace==="floorball"?"floorball":"hockey";return pt(i,n),typeof e.timeScale=="number"&&(n.game.timeScale=Math.max(.1,Math.min(1,e.timeScale))),typeof e.speedScale=="number"&&(n.skate.speedScale=Math.max(.2,Math.min(1.5,e.speedScale))),i}catch{return"hockey"}}function U(n,t){try{const e={timeScale:n.game.timeScale,pace:t,speedScale:n.skate.speedScale};localStorage.setItem(gt,JSON.stringify(e))}catch{}}const mt=document.getElementById("game");let M=ae(x);const L=new Wt(x),ft=new Ht(mt,x),K=new Ft,at=new Dt(mt,(n,t)=>ft.camera.toWorld(n,t)),oe=new zt,V=new ne(document.getElementById("hud"),document.getElementById("help"),document.getElementById("banner")),ot=new wt(1/120),vt=n=>{M=n,pt(M,x),U(x,M)};se(x,{getPace:()=>M,setPace:vt,onSpeedChange:()=>U(x,M)});function lt(n){const t=x.game.timeScale,e=n>0?G.find(i=>i>t+.001)??1:[...G].reverse().find(i=>i<t-.001)??G[0];x.game.timeScale=e,U(x,M),V.flash(`${Math.round(e*100)}%`)}function le(){const n=K.poll(),t=at.poll(L.player.pos,x.stick.maxReach);return n&&K.lastActivity>=at.lastActivity?n:t}let _=j(),C=null,rt=performance.now()/1e3;function yt(){const n=performance.now()/1e3,t=Math.min(.1,n-rt);rt=n,_=le(),_.speedUp&&lt(1),_.speedDown&&lt(-1),_.togglePace&&(vt(M==="hockey"?"floorball":"hockey"),V.flash(M==="hockey"?"Hockey pace":"Floorball pace")),_.reset&&L.resetPuck();const e=oe.update(_.blade,L.player.facing,n,x);e&&(C={flick:e,at:n}),C&&n-C.at>.25&&(C=null);const i=x.game.timeScale;ot.advance(t,i,s=>{L.step(s,{move:_.move,blade:_.blade,shoot:_.shoot,stop:_.stop,flick:(C==null?void 0:C.flick)??null}),C=null});for(const s of L.events)s.type==="goal"&&V.flash("GOAL!");L.events.length=0,ft.draw(L,ot.alpha,t,t*i),V.update(L,x,M,K,_.source,n),requestAnimationFrame(yt)}requestAnimationFrame(yt);At();
