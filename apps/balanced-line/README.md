# Line Simulator
This runs three similar lines at once. 
1 The first is an "ideal" line - each operation has exactly the same capacity, and there is zero variation. Result - maximum throughput.
2 The second line is also balanced, but with variation in each operation's performance in the form of random delays. The operations are faster though, so the average time for each operation is the same as the first line. Or is it?
3 The third line is unbalanced. The first operation is quicker, but with a greater chance of delays. Subsequent operations have less chance of delays but are slower. Overall, each operation still has an average performance over time the same as the first line's operations.

Question: which of the two lines with variation/delays will perform closest to the ideal?

The theory behind this simulator is explained very well at Kelvyn Youngman's Theory of Constraints website: http://www.dbrmfg.co.nz/ Thanks Kelvyn, for a great resource.
