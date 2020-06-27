const getAnimations = (defArray) => {
	let time = 0;
	const x = defArray.map(row => {
		const [ts, code] = row.split(' ');
		const tm = Number.parseInt(ts);
		if(tm < 0) {
			time = tm * -1;
		} else {
			time += tm;
		}
		return { time, code };
	});
	return (t1, t2) => {
		return x.filter(obj => obj.time > t1 && obj.time <= t2);
	}
}


const getMouthAnimation = () => {
const defn = `0 -
-526 W
40 E
40 l
40 K
40 U
40 m
40 t
40 U
40 d
40 U
50 m
50 A
50 k
50 I
50 n
50 g
-1146 s
50 E
60 n
60 s
-1421 p
100 O
100 d
100 k
100 A
150 s
200 t
100 -
-2700 D
50 I
50 S
50 I
50 S
140 A
100 M
50 H
100 A
60 R
50 i
150 s
300 -
-5130 O
-5402 K
-5490 A
100 E
-5918 W
100 E
100 L
50 I
50 T
50 S
50 E
40 M
50 S
40 L
40 I
40 K
40 I
-6603 G
50 O
50 T
50 I
50 N
50 T
50 U 
-7038 T
50 R
50 U
150 B
150 L
200 w
-7943 I
50 N
50 A
-8280 H
60 O
50 W
50 S
40 K
80 E
-8655 P
50 I
40 N
40 G
70 A
60 E
60 D
190 I
60 D  
-9393 e
60 -
-10289 h
-10474 F
70 O
70 R
70 D
70 E
100 -
-11145 D
60 U
60 D
60 E
60 A
-11486 P
100 E
100 R
100 L
80 -

-12226 P
80 O
80 D
80 K
80 A
80 S
80 T
-12839 -
`;

return defn.split("\n");
}