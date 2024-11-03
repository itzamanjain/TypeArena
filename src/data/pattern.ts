export interface Question {
    id: string;
    title: string;
    link: string;
    pattern: string;
    completed?: boolean;
    notes?: string;
  }
  
  export const patterns: Question[] = [
    // Fast and Slow Pointer
    {
      id: '1',
      title: 'Linked List Cycle II',
      link: 'https://leetcode.com/problems/linked-list-cycle-ii/',
      pattern: 'Fast and Slow Pointer',
    },
    {
      id: '2',
      title: 'Remove nth Node from the End of List',
      link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
      pattern: 'Fast and Slow Pointer',
    },
    {
      id: '3',
      title: 'Find the Duplicate Number',
      link: 'https://leetcode.com/problems/find-the-duplicate-number/',
      pattern: 'Fast and Slow Pointer',
    },
    {
      id: '4',
      title: 'Palindrome Linked List',
      link: 'https://leetcode.com/problems/palindrome-linked-list/',
      pattern: 'Fast and Slow Pointer',
    },
  
    // Overlapping Intervals
    {
      id: '5',
      title: 'Merge Intervals',
      link: 'https://leetcode.com/problems/merge-intervals/',
      pattern: 'Overlapping Intervals',
    },
    {
      id: '6',
      title: 'Insert Interval',
      link: 'https://leetcode.com/problems/insert-interval/',
      pattern: 'Overlapping Intervals',
    },
    {
      id: '7',
      title: 'My Calendar II',
      link: 'https://leetcode.com/problems/my-calendar-ii/',
      pattern: 'Overlapping Intervals',
    },
    {
      id: '8',
      title: 'Minimum Number of Arrows to Burst Balloons',
      link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
      pattern: 'Overlapping Intervals',
    },
    {
      id: '9',
      title: 'Non-overlapping Intervals',
      link: 'https://leetcode.com/problems/non-overlapping-intervals/',
      pattern: 'Overlapping Intervals',
    },
  
    // Prefix Sum
    {
      id: '10',
      title: 'Find the Middle Index in Array',
      link: 'https://leetcode.com/problems/find-the-middle-index-in-array/',
      pattern: 'Prefix Sum',
    },
    {
      id: '11',
      title: 'Product of Array Except Self',
      link: 'https://leetcode.com/problems/product-of-array-except-self/',
      pattern: 'Prefix Sum',
    },
    {
      id: '12',
      title: 'Maximum Product Subarray',
      link: 'https://leetcode.com/problems/maximum-product-subarray/',
      pattern: 'Prefix Sum',
    },
    {
      id: '13',
      title: 'Number of Ways to Split Array',
      link: 'https://leetcode.com/problems/number-of-ways-to-split-array/',
      pattern: 'Prefix Sum',
    },
    {
      id: '14',
      title: 'Range Sum Query 2D',
      link: 'https://leetcode.com/problems/range-sum-query-2d-immutable/',
      pattern: 'Prefix Sum',
    },
  
    // Sliding Window Fixed Size
    {
      id: '15',
      title: 'Maximum Sum Subarray of Size K',
      link: 'https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/',
      pattern: 'Sliding Window Fixed',
    },
    {
      id: '16',
      title: 'Number of Subarrays with Average ≥ Threshold',
      link: 'https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/',
      pattern: 'Sliding Window Fixed',
    },
    {
      id: '17',
      title: 'Repeated DNA Sequences',
      link: 'https://leetcode.com/problems/repeated-dna-sequences/',
      pattern: 'Sliding Window Fixed',
    },
    {
      id: '18',
      title: 'Permutation in String',
      link: 'https://leetcode.com/problems/permutation-in-string/',
      pattern: 'Sliding Window Fixed',
    },
    {
      id: '19',
      title: 'Sliding Subarray Beauty',
      link: 'https://leetcode.com/problems/sliding-subarray-beauty/',
      pattern: 'Sliding Window Fixed',
    },
    {
      id: '20',
      title: 'Sliding Window Maximum',
      link: 'https://leetcode.com/problems/sliding-window-maximum/',
      pattern: 'Sliding Window Fixed',
    },
  
    // Sliding Window Variable Size
    {
      id: '21',
      title: 'Longest Substring Without Repeating Characters',
      link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      pattern: 'Sliding Window Variable',
    },
    {
      id: '22',
      title: 'Minimum Size Subarray Sum',
      link: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
      pattern: 'Sliding Window Variable',
    },
    {
      id: '23',
      title: 'Subarray Product Less Than K',
      link: 'https://leetcode.com/problems/subarray-product-less-than-k/',
      pattern: 'Sliding Window Variable',
    },
    {
      id: '24',
      title: 'Max Consecutive Ones III',
      link: 'https://leetcode.com/problems/max-consecutive-ones-iii/',
      pattern: 'Sliding Window Variable',
    },
    {
      id: '25',
      title: 'Fruits Into Baskets',
      link: 'https://leetcode.com/problems/fruit-into-baskets/',
      pattern: 'Sliding Window Variable',
    },
    {
      id: '26',
      title: 'Count Number of Nice Subarrays',
      link: 'https://leetcode.com/problems/count-number-of-nice-subarrays',
      pattern: 'Sliding Window Variable',
    },
    {
      id: '27',
      title: 'Minimum Window Substring',
      link: 'https://leetcode.com/problems/minimum-window-substring/',
      pattern: 'Sliding Window Variable',
    },
  
    // Two Pointers
    {
      id: '28',
      title: 'Two Sum II - Input Array is Sorted',
      link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
      pattern: 'Two Pointers',
    },
    {
      id: '29',
      title: 'Sort Colors',
      link: 'https://leetcode.com/problems/sort-colors/',
      pattern: 'Two Pointers',
    },
    {
      id: '30',
      title: 'Next Permutation',
      link: 'https://leetcode.com/problems/next-permutation/',
      pattern: 'Two Pointers',
    },
    {
      id: '31',
      title: 'Bag of Tokens',
      link: 'https://leetcode.com/problems/bag-of-tokens/',
      pattern: 'Two Pointers',
    },
    {
      id: '32',
      title: 'Container With Most Water',
      link: 'https://leetcode.com/problems/container-with-most-water/',
      pattern: 'Two Pointers',
    },
    {
      id: '33',
      title: 'Trapping Rain Water',
      link: 'https://leetcode.com/problems/trapping-rain-water/',
      pattern: 'Two Pointers',
    },
  
    // Cyclic Sort
    {
      id: '34',
      title: 'Missing Number',
      link: 'https://leetcode.com/problems/missing-number/',
      pattern: 'Cyclic Sort',
    },
    {
      id: '35',
      title: 'Find All Numbers Disappeared',
      link: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/',
      pattern: 'Cyclic Sort',
    },
    {
      id: '36',
      title: 'Set Mismatch',
      link: 'https://leetcode.com/problems/set-mismatch/',
      pattern: 'Cyclic Sort',
    },
    {
      id: '37',
      title: 'First Missing Positive',
      link: 'https://leetcode.com/problems/first-missing-positive/',
      pattern: 'Cyclic Sort',
    },
  
    // Linked List Reversal
    {
      id: '38',
      title: 'Reverse Linked List',
      link: 'https://leetcode.com/problems/reverse-linked-list/',
      pattern: 'Linked List Reversal',
    },
    {
      id: '39',
      title: 'Reverse Nodes in k-Group',
      link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
      pattern: 'Linked List Reversal',
    },
    {
      id: '40',
      title: 'Swap Nodes in Pairs',
      link: 'https://leetcode.com/problems/swap-nodes-in-pairs/',
      pattern: 'Linked List Reversal',
    },
  
    // Matrix Manipulation
    {
      id: '41',
      title: 'Rotate Image',
      link: 'https://leetcode.com/problems/rotate-image/',
      pattern: 'Matrix Manipulation',
    },
    {
      id: '42',
      title: 'Spiral Matrix',
      link: 'https://leetcode.com/problems/spiral-matrix/',
      pattern: 'Matrix Manipulation',
    },
    {
      id: '43',
      title: 'Set Matrix Zeroes',
      link: 'https://leetcode.com/problems/set-matrix-zeroes/',
      pattern: 'Matrix Manipulation',
    },
    {
      id: '44',
      title: 'Game of Life',
      link: 'https://leetcode.com/problems/game-of-life/',
      pattern: 'Matrix Manipulation',
    },
  
    // BFS
    {
      id: '45',
      title: 'Shortest Path in Binary Matrix',
      link: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
      pattern: 'BFS',
    },
    {
      id: '46',
      title: 'Rotting Oranges',
      link: 'https://leetcode.com/problems/rotting-oranges/',
      pattern: 'BFS',
    },
    {
      id: '47',
      title: 'As Far from Land as Possible',
      link: 'https://leetcode.com/problems/as-far-from-land-as-possible/',
      pattern: 'BFS',
    },
    {
      id: '48',
      title: 'Word Ladder',
      link: 'https://leetcode.com/problems/word-ladder/',
      pattern: 'BFS',
    },
  
    // DFS
    {
      id: '49',
      title: 'Number of Closed Islands',
      link: 'https://leetcode.com/problems/number-of-closed-islands/',
      pattern: 'DFS',
    },
    {
      id: '50',
      title: 'Coloring a Border',
      link: 'https://leetcode.com/problems/coloring-a-border/',
      pattern: 'DFS',
    },
    {
      id: '51',
      title: 'Number of Enclaves',
      link: 'https://leetcode.com/problems/number-of-enclaves/',
      pattern: 'DFS',
    },
    {
      id: '52',
      title: 'Time Needed to Inform All Employees',
      link: 'https://leetcode.com/problems/time-needed-to-inform-all-employees/',
      pattern: 'DFS',
    },
    {
      id: '53',
      title: 'Find Eventual Safe States',
      link: 'https://leetcode.com/problems/find-eventual-safe-states/',
      pattern: 'DFS',
    },
  
    // Backtracking
    {
      id: '54',
      title: 'Permutations II',
      link: 'https://leetcode.com/problems/permutations-ii/',
      pattern: 'Backtracking',
    },
    {
      id: '55',
      title: 'Combination Sum',
      link: 'https://leetcode.com/problems/combination-sum/',
      pattern: 'Backtracking',
    },
    {
      id: '56',
      title: 'Generate Parentheses',
      link: 'https://leetcode.com/problems/generate-parentheses/',
      pattern: 'Backtracking',
    },
    {
      id: '57',
      title: 'N-Queens',
      link: 'https://leetcode.com/problems/n-queens/',
      pattern: 'Backtracking',
    },
    {
      id: '58',
      title: 'Sudoku Solver',
      link: 'https://leetcode.com/problems/sudoku-solver/',
      pattern: 'Backtracking',
    },
    {
      id: '59',
      title: 'Palindrome Partitioning',
      link: 'https://leetcode.com/problems/palindrome-partitioning/',
      pattern: 'Backtracking',
    },
    {
      id: '60',
      title: 'Word Search',
      link: 'https://leetcode.com/problems/word-search/',
      pattern: 'Backtracking',
    },
  
    // Modified Binary Search
    {
      id: '61',
      title: 'Search in Rotated Sorted Array',
      link: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/',
      pattern: 'Modified Binary Search',
    },
    {
      id: '62',
      title: 'Find Minimum in Rotated Sorted Array',
      link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
      pattern: 'Modified Binary Search',
    },
    {
      id: '63',
      title: 'Find Peak Element',
      link: 'https://leetcode.com/problems/find-peak-element/',
      pattern: 'Modified Binary Search',
    },
    {
      id: '64',
      title: 'Single Element in a Sorted Array',
      link: 'https://leetcode.com/problems/single-element-in-a-sorted-array/',
      pattern: 'Modified Binary Search',
    },
    {
      id: '65',
      title: 'Minimum Speed to Arrive on Time',
      link: 'https://leetcode.com/problems/minimum-speed-to-arrive-on-time/',
      pattern: 'Modified Binary Search',
    },
    {
      id: '66',
      title: 'Capacity To Ship Packages',
      link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
      pattern: 'Modified Binary Search',
    },
    {
      id: '67',
      title: 'Koko Eating Bananas',
      link: 'https://leetcode.com/problems/koko-eating-bananas',
      pattern: 'Modified Binary Search',
    },
    {
      id: '68',
      title: 'Find in Mountain Array',
      link: 'https://leetcode.com/problems/find-in-mountain-array/',
      pattern: 'Modified Binary Search',
    },
    {
      id: '69',
      title: 'Median of Two Sorted Arrays',
      link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
      pattern: 'Modified Binary Search',
    },
  
    // Bitwise XOR
    {
      id: '70',
      title: 'Missing Number',
      link: 'https://leetcode.com/problems/missing-number/',
      pattern: 'Bitwise XOR',
    },
    {
      id: '71',
      title: 'Single Number II',
      link: 'https://leetcode.com/problems/single-number-ii/',
      pattern: 'Bitwise XOR',
    },
    {
      id: '72',
      title: 'Single Number III',
      link: 'https://leetcode.com/problems/single-number-iii/',
      pattern: 'Bitwise XOR',
    },
    {
      id: '73',
      title: 'Find Original Array of Prefix XOR',
      link: 'https://leetcode.com/problems/find-the-original-array-of-prefix-xor/',
      pattern: 'Bitwise XOR',
    },
    {
      id: '74',
      title: 'XOR Queries of a Subarray',
      link: 'https://leetcode.com/problems/xor-queries-of-a-subarray/',
      pattern: 'Bitwise XOR',
    },
  
    // Top K Elements
    {
      id: '75',
      title: 'Top K Frequent Elements',
      link: 'https://leetcode.com/problems/top-k-frequent-elements/',
      pattern: 'Top K Elements',
    },
    {
      id: '76',
      title: 'Kth Largest Element',
      link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      pattern: 'Top K Elements',
    },
    {
      id: '77',
      title: 'Ugly Number II',
      link: 'https://leetcode.com/problems/ugly-number-ii/',
      pattern: 'Top K Elements',
    },
    {
      id: '78',
      title: 'K Closest Points to Origin',
      link: 'https://leetcode.com/problems/k-closest-points-to-origin/',
      pattern: 'Top K Elements',
    },
  
    // K-way Merge
    {
      id: '79',
      title: 'Find K Pairs with Smallest Sums',
      link: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/',
      pattern: 'K-way Merge',
    },
    {
      id: '80',
      title: 'Kth Smallest Element in Sorted Matrix',
      link: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
      pattern: 'K-way Merge',
    },
    {
      id: '81',
      title: 'Merge K Sorted Lists',
      link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      pattern: 'K-way Merge',
    },
    {
      id: '82',
      title: 'Smallest Range Covering K Lists',
      link: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/',
      pattern: 'K-way Merge',
    },
  
    // Two Heaps
    {
      id: '83',
      title: 'Find Median from Data Stream',
      link: 'https://leetcode.com/problems/find-median-from-data-stream/',
      pattern: 'Two Heaps',
    },
    {
      id: '84',
      title: 'Sliding Window Median',
      link: 'https://leetcode.com/problems/sliding-window-median/',
      pattern: 'Two Heaps',
    },
    {
      id: '85',
      title: 'IPO',
      link: 'https://leetcode.com/problems/ipo/',
      pattern: 'Two Heaps',
    },
  
    // Monotonic Stack
    {
      id: '86',
      title: 'Next Greater Element II',
      link: 'https://leetcode.com/problems/next-greater-element-ii/',
      pattern: 'Monotonic Stack',
    },
    {
      id: '87',
      title: 'Next Greater Node in Linked List',
      link: 'https://leetcode.com/problems/next-greater-node-in-linked-list/',
      pattern: 'Monotonic Stack',
    },
    {
      id: '88',
      title: 'Daily Temperatures',
      link: 'https://leetcode.com/problems/daily-temperatures/',
      pattern: 'Monotonic Stack',
    },
    {
      id: '89',
      title: 'Online Stock Span',
      link: 'https://leetcode.com/problems/online-stock-span/',
      pattern: 'Monotonic Stack',
    },
    {
      id: '90',
      title: 'Maximum Width Ramp',
      link: 'https://leetcode.com/problems/maximum-width-ramp/',
      pattern: 'Monotonic Stack',
    },
    {
      id: '91',
      title: 'Largest Rectangle in Histogram',
      link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      pattern: 'Monotonic Stack',
    },
  
    // Trees - Level Order Traversal
    {
      id: '92',
      title: 'Level Order Traversal',
      link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      pattern: 'Trees - Level Order',
    },
    {
      id: '93',
      title: 'Zigzag Level Order Traversal',
      link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
      pattern: 'Trees - Level Order',
    },
    {
      id: '94',
      title: 'Even Odd Tree',
      link: 'https://leetcode.com/problems/even-odd-tree/',
      pattern: 'Trees - Level Order',
    },
    {
      id: '95',
      title: 'Reverse Odd Levels',
      link: 'https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/',
      pattern: 'Trees - Level Order',
    },
    {
      id: '96',
      title: 'Deepest Leaves Sum',
      link: 'https://leetcode.com/problems/deepest-leaves-sum/',
      pattern: 'Trees - Level Order',
    },
    {
      id: '97',
      title: 'Add One Row to Tree',
      link: 'https://leetcode.com/problems/add-one-row-to-tree/',
      pattern: 'Trees - Level Order',
    },
    {
      id: '98',
      title: 'Maximum Width of Binary Tree',
      link: 'https://leetcode.com/problems/maximum-width-of-binary-tree/',
      pattern: 'Trees - Level Order',
    },
    {
      id: '99',
      title: 'All Nodes Distance K in Binary Tree',
      link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/',
      pattern: 'Trees - Level Order',
    },
  
    // Trees - Construction
    {
      id: '100',
      title: 'Construct BT from Preorder and Inorder',
      link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
      pattern: 'Trees - Construction',
    },
    {
      id: '101',
      title: 'Construct BT from Postorder and Inorder',
      link: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/',
      pattern: 'Trees - Construction',
    },
    {
      id: '102',
      title: 'Maximum Binary Tree',
      link: 'https://leetcode.com/problems/maximum-binary-tree/',
      pattern: 'Trees - Construction',
    },
    {
      id: '103',
      title: 'Construct BST from Preorder',
      link: 'https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/',
      pattern: 'Trees - Construction',
    },
  
    // Trees - Height
    {
      id: '104',
      title: 'Maximum Depth of Binary Tree',
      link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
      pattern: 'Trees - Height',
    },
    {
      id: '105',
      title: 'Balanced Binary Tree',
      link: 'https://leetcode.com/problems/balanced-binary-tree/',
      pattern: 'Trees - Height',
    },
    {
      id: '106',
      title: 'Diameter of Binary Tree',
      link: 'https://leetcode.com/problems/diameter-of-binary-tree/',
      pattern: 'Trees - Height',
    },
    {
      id: '107',
      title: 'Minimum Depth of Binary Tree',
      link: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/',
      pattern: 'Trees - Height',
    },
  
    // Trees - Path Problems
    {
      id: '108',
      title: 'Binary Tree Paths',
      link: 'https://leetcode.com/problems/binary-tree-paths/',
      pattern: 'Trees - Path',
    },
    {
      id: '109',
      title: 'Path Sum II',
      link: 'https://leetcode.com/problems/path-sum-ii/',
      pattern: 'Trees - Path',
    },
    {
      id: '110',
      title: 'Sum Root to Leaf Numbers',
      link: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/',
      pattern: 'Trees - Path',
    },
    {
      id: '111',
      title: 'Smallest String Starting from Leaf',
      link: 'https://leetcode.com/problems/smallest-string-starting-from-leaf',
      pattern: 'Trees - Path',
    },
    {
      id: '112',
      title: 'Insufficient Nodes in Root to Leaf Paths',
      link: 'https://leetcode.com/problems/insufficient-nodes-in-root-to-leaf-paths/',
      pattern: 'Trees - Path',
    },
    {
      id: '113',
      title: 'Pseudo-Palindromic Paths',
      link: 'https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/',
      pattern: 'Trees - Path',
    },
    {
      id: '114',
      title: 'Binary Tree Maximum Path Sum',
      link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
      pattern: 'Trees - Path',
    },
  
    // Trees - Ancestor Problems
    {
      id: '115',
      title: 'LCA of Binary Tree',
      link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      pattern: 'Trees - Ancestor',
    },
    {
      id: '116',
      title: 'Maximum Difference Between Node and Ancestor',
      link: 'https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/',
      pattern: 'Trees - Ancestor',
    },
    {
      id: '117',
      title: 'LCA of Deepest Leaves',
      link: 'https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/',
      pattern: 'Trees - Ancestor',
    },
    {
      id: '118',
      title: 'Kth Ancestor of Tree Node',
      link: 'https://leetcode.com/problems/kth-ancestor-of-a-tree-node/',
      pattern: 'Trees - Ancestor',
    },
  
    // Binary Search Tree
    {
      id: '119',
      title: 'Validate BST',
      link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      pattern: 'Binary Search Tree',
    },
    {
      id: '120',
      title: 'Range Sum of BST',
      link: 'https://leetcode.com/problems/range-sum-of-bst/',
      pattern: 'Binary Search Tree',
    },
    {
      id: '121',
      title: 'Minimum Absolute Difference in BST',
      link: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/',
      pattern: 'Binary Search Tree',
    },
    {
      id: '122',
      title: 'Insert into a BST',
      link: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/',
      pattern: 'Binary Search Tree',
    },
    {
      id: '123',
      title: 'LCA of BST',
      link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
      pattern: 'Binary Search Tree',
    },
  
    // Dynamic Programming - Take/Not Take
    {
      id: '124',
      title: 'House Robber II',
      link: 'https://leetcode.com/problems/house-robber-ii/',
      pattern: 'DP - Take/Not Take',
    },
    {
      id: '125',
      title: 'Target Sum',
      link: 'https://leetcode.com/problems/target-sum/',
      pattern: 'DP - Take/Not Take',
    },
    {
      id: '126',
      title: 'Partition Equal Subset Sum',
      link: 'https://leetcode.com/problems/partition-equal-subset-sum/',
      pattern: 'DP - Take/Not Take',
    },
    {
      id: '127',
      title: 'Ones and Zeroes',
      link: 'https://leetcode.com/problems/ones-and-zeroes/',
      pattern: 'DP - Take/Not Take',
    },
    {
      id: '128',
      title: 'Last Stone Weight II',
      link: 'https://leetcode.com/problems/last-stone-weight-ii/',
      pattern: 'DP - Take/Not Take',
    },
  
    // Dynamic Programming - Infinite Supply
    {
      id: '129',
      title: 'Coin Change',
      link: 'https://leetcode.com/problems/coin-change/',
      pattern: 'DP - Infinite Supply',
    },
    {
      id: '130',
      title: 'Coin Change II',
      link: 'https://leetcode.com/problems/coin-change-ii/',
      pattern: 'DP - Infinite Supply',
    },
    {
      id: '131',
      title: 'Perfect Squares',
      link: 'https://leetcode.com/problems/perfect-squares/',
      pattern: 'DP - Infinite Supply',
    },
    {
      id: '132',
      title: 'Minimum Cost For Tickets',
      link: 'https://leetcode.com/problems/minimum-cost-for-tickets/',
      pattern: 'DP - Infinite Supply',
    },
  
    // Dynamic Programming - LIS
    {
      id: '133',
      title: 'Longest Increasing Subsequence',
      link: 'https://leetcode.com/problems/longest-increasing-subsequence',
      pattern: 'DP - LIS',
    },
    {
      id: '134',
      title: 'Largest Divisible Subset',
      link: 'https://leetcode.com/problems/largest-divisible-subset/',
      pattern: 'DP - LIS',
    },
    {
      id: '135',
      title: 'Maximum Length of Pair Chain',
      link: 'https://leetcode.com/problems/maximum-length-of-pair-chain/',
      pattern: 'DP - LIS',
    },
    {
      id: '136',
      title: 'Number of LIS',
      link: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/',
      pattern: 'DP - LIS',
    },
    {
      id: '137',
      title: 'Longest String Chain',
      link: 'https://leetcode.com/problems/longest-string-chain/',
      pattern: 'DP - LIS',
    },
  
    // Dynamic Programming - Grid
    {
      id: '138',
      title: 'Unique Paths II',
      link: 'https://leetcode.com/problems/unique-paths-ii/',
      pattern: 'DP - Grid',
    },
    {
      id: '139',
      title: 'Minimum Path Sum',
      link: 'https://leetcode.com/problems/minimum-path-sum/',
      pattern: 'DP - Grid',
    },
    {
      id: '140',
      title: 'Triangle',
      link: 'https://leetcode.com/problems/triangle/',
      pattern: 'DP - Grid',
    },
    {
      id: '141',
      title: 'Minimum Falling Path Sum',
      link: 'https://leetcode.com/problems/minimum-falling-path-sum/',
      pattern: 'DP - Grid',
    },
    {
      id: '142',
      title: 'Maximal Square',
      link: 'https://leetcode.com/problems/maximal-square/',
      pattern: 'DP - Grid',
    },
    {
      id: '143',
      title: 'Cherry Pickup',
      link: 'https://leetcode.com/problems/cherry-pickup/',
      pattern: 'DP - Grid',
    },
    {
      id: '144',
      title: 'Dungeon Game',
      link: 'https://leetcode.com/problems/dungeon-game/',
      pattern: 'DP - Grid',
    },
  
    // Dynamic Programming - Strings
    {
      id: '145',
      title: 'Longest Common Subsequence',
      link: 'https://leetcode.com/problems/longest-common-subsequence/',
      pattern: 'DP - Strings',
    },
    {
      id: '146',
      title: 'Longest Palindromic Subsequence',
      link: 'https://leetcode.com/problems/longest-palindromic-subsequence/',
      pattern: 'DP - Strings',
    },
    {
      id: '147',
      title: 'Palindromic Substrings',
      link: 'https://leetcode.com/problems/palindromic-substrings/',
      pattern: 'DP - Strings',
    },
    {
      id: '148',
      title: 'Longest Palindromic Substring',
      link: 'https://leetcode.com/problems/longest-palindromic-substring/',
      pattern: 'DP - Strings',
    },
    {
      id: '149',
      title: 'Edit Distance',
      link: 'https://leetcode.com/problems/edit-distance/',
      pattern: 'DP - Strings',
    },
    {
      id: '150',
      title: 'Minimum ASCII Delete Sum',
      link: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/',
      pattern: 'DP - Strings',
    },
    {
      id: '151',
      title: 'Distinct Subsequences',
      link: 'https://leetcode.com/problems/distinct-subsequences/',
      pattern: 'DP - Strings',
    },
    {
      id: '152',
      title: 'Shortest Common Supersequence',
      link: 'https://leetcode.com/problems/shortest-common-supersequence/',
      pattern: 'DP - Strings',
    },
    {
      id: '153',
      title: 'Wildcard Matching',
      link: 'https://leetcode.com/problems/wildcard-matching/',
      pattern: 'DP - Strings',
    },
  
    // Dynamic Programming - Stocks
    {
      id: '154',
      title: 'Best Time to Buy and Sell Stock II',
      link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/',
      pattern: 'DP - Stocks',
    },
    {
      id: '155',
      title: 'Best Time to Buy and Sell Stock III',
      link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/',
      pattern: 'DP - Stocks',
    },
    {
      id: '156',
      title: 'Best Time to Buy and Sell Stock IV',
      link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/',
      pattern: 'DP - Stocks',
    },
    {
      id: '157',
      title: 'Best Time to Buy and Sell Stock with Cooldown',
      link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
      pattern: 'DP - Stocks',
    },
    {
      id: '158',
      title: 'Best Time to Buy and Sell Stock with Transaction Fee',
      link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/',
      pattern: 'DP - Stocks',
    },
  
    // Dynamic Programming - Partition
    {
      id: '159',
      title: 'Partition Array for Maximum Sum',
      link: 'https://leetcode.com/problems/partition-array-for-maximum-sum/',
      pattern: 'DP - Partition',
    },
    {
      id: '160',
      title: 'Burst Balloons',
      link: 'https://leetcode.com/problems/burst-balloons/',
      pattern: 'DP - Partition',
    },
    {
      id: '161',
      title: 'Minimum Cost to Cut a Stick',
      link: 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/',
      pattern: 'DP - Partition',
    },
    {
      id: '162',
      title: 'Palindrome Partitioning II',
      link: 'https://leetcode.com/problems/palindrome-partitioning-ii/',
      pattern: 'DP - Partition',
    },
  
    // Graphs - Topological Sort
    {
      id: '163',
      title: 'Course Schedule',
      link: 'https://leetcode.com/problems/course-schedule/',
      pattern: 'Graphs - Topological Sort',
    },
    {
      id: '164',
      title: 'Course Schedule II',
      link: 'https://leetcode.com/problems/course-schedule-ii/',
      pattern: 'Graphs - Topological Sort',
    },
    {
      id: '165',
      title: 'Strange Printer II',
      link: 'https://leetcode.com/problems/strange-printer-ii/',
      pattern: 'Graphs - Topological Sort',
    },
    {
      id: '166',
      title: 'Sequence Reconstruction',
      link: 'https://leetcode.com/problems/sequence-reconstruction/',
      pattern: 'Graphs - Topological Sort',
    },
    {
      id: '167',
      title: 'Alien Dictionary',
      link: 'https://leetcode.com/problems/alien-dictionary/',
      pattern: 'Graphs - Topological Sort',
    },
  
    // Graphs - Union Find
    {
      id: '168',
      title: 'Number of Operations to Make Network Connected',
      link: 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/',
      pattern: 'Graphs - Union Find',
    },
    {
      id: '169',
      title: 'Redundant Connection',
      link: 'https://leetcode.com/problems/redundant-connection/',
      pattern: 'Graphs - Union Find',
    },
    {
      id: '170',
      title: 'Accounts Merge',
      link: 'https://leetcode.com/problems/accounts-merge/',
      pattern: 'Graphs - Union Find',
    },
    {
      id: '171',
      title: 'Satisfiability of Equality Equations',
      link: 'https://leetcode.com/problems/satisfiability-of-equality-equations/',
      pattern: 'Graphs - Union Find',
    },
  
    // Graphs - Algorithms
    {
      id: '172',
      title: 'Minimum Cost to Connect Points',
      link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/',
      pattern: 'Graphs - Algorithms',
    },
    {
      id: '173',
      title: 'Cheapest Flights Within K Stops',
      link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
      pattern: 'Graphs - Algorithms',
    },
    {
      id: '174',
      title: 'Find City With Smallest Number of Neighbors',
      link: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/',
      pattern: 'Graphs - Algorithms',
    },
    {
      id: '175',
      title: 'Network Delay Time',
      link: 'https://leetcode.com/problems/network-delay-time',
      pattern: 'Graphs - Algorithms',
    },
  
    // Greedy
    {
      id: '176',
      title: 'Jump Game II',
      link: 'https://leetcode.com/problems/jump-game-ii/',
      pattern: 'Greedy',
    },
    {
      id: '177',
      title: 'Gas Station',
      link: 'https://leetcode.com/problems/gas-station/',
      pattern: 'Greedy',
    },
    {
      id: '178',
      title: 'Bag of Tokens',
      link: 'https://leetcode.com/problems/bag-of-tokens/',
      pattern: 'Greedy',
    },
    {
      id: '179',
      title: 'Boats to Save People',
      link: 'https://leetcode.com/problems/boats-to-save-people/',
      pattern: 'Greedy',
    },
    {
      id: '180',
      title: 'Wiggle Subsequence',
      link: 'https://leetcode.com/problems/wiggle-subsequence/',
      pattern: 'Greedy',
    },
    {
      id: '181',
      title: 'Car Pooling',
      link: 'https://leetcode.com/problems/car-pooling/',
      pattern: 'Greedy',
    },
    {
      id: '182',
      title: 'Candy',
      link: 'https://leetcode.com/problems/candy/',
      pattern: 'Greedy',
    },
  
    // Design
    {
      id: '183',
      title: 'Design Twitter',
      link: 'https://leetcode.com/problems/design-twitter/',
      pattern: 'Design',
    },
    {
      id: '184',
      title: 'Design Browser History',
      link: 'https://leetcode.com/problems/design-browser-history/',
      pattern: 'Design',
    },
    {
      id: '185',
      title: 'Design Circular Deque',
      link: 'https://leetcode.com/problems/design-circular-deque/',
      pattern: 'Design',
    },
    {
      id: '186',
      title: 'Snapshot Array',
      link: 'https://leetcode.com/problems/snapshot-array/',
      pattern: 'Design',
    },
    {
      id: '187',
      title: 'LRU Cache',
      link: 'https://leetcode.com/problems/lru-cache/',
      pattern: 'Design',
    },
    {
      id: '188',
      title: 'LFU Cache',
      link: 'https://leetcode.com/problems/lfu-cache/',
      pattern: 'Design',
    }
  ];