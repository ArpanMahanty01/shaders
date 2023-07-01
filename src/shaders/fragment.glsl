precision mediump float;

#define PI 3.14159265359

uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;


vec3 palette(float t){
	vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);

	return a + b*cos( 6.28318*(c*t+d) );
}


void main() {
	vec2 uv = vUv;
	uv = uv-0.5;
	uv = uv * 2.0;
	vec2 uv0 = uv;
	float time = uTime*0.01;

	vec3 finalColor = vec3(0.0);

	for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i * .4 + time * .4);

        d = sin(d*8. + time)/8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }

	// vec3 finalColor = vec3(sin(time),cos(time),0.0);


	// vec3 c;
	// float l,z = time;
	// for(int i=0;i<3;i++){
	// 	vec2 p = vPosition.xy/uv;
	// 	vec2 k = p;
	// 	p-=.5;
	// 	p.x*=uv.x/uv.y;
	// 	z+=0.07;
	// 	l = length(p);
	// 	k+=p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
	// 	c[i]=.01/length(mod(k,1.)-.5);
	// }
	

	gl_FragColor = vec4(finalColor,1);
}