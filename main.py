import math
def editLength(a : str, b : str) -> int:
    m,n = len(a),len(b)
    matrix = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1):
        matrix[i][0] = i
    for j in range(n+1):
        matrix[0][j] = j

    for i in range(1,m+1):
        for j in range(1,n+1):
            if a[i-1] == b[j-1]:
                matrix[i][j] = matrix[i-1][j-1]
            else:
                matrix[i][j] = min(matrix[i][j-1],matrix[i-1][j], matrix[i-1][j-1])+1
    print(matrix)
    return matrix[-1][-1]


def edit_distance(word1, word2):
    len1 = len(word1)
    len2 = len(word2)
    dp = [[0]*(len2+1) for _ in range(len1+1)]
    for i in range(len1 + 1):
        dp[i][0] = i
    for j in range(len2 + 1):
        dp[0][j] = j

    for i in range(1, len1 + 1):
        for j in range(1, len2 + 1):
            delta = 0 if word1[i - 1] == word2[j - 1] else 1
            dp[i][j] = min(dp[i - 1][j - 1] + delta, min(dp[i - 1][j] + 1, dp[i][j - 1] + 1))

    print(dp)
    return dp[len1][len2]

def largestDivisibleSubset(nums:list):
    l = len(nums)
    if l < 2:
        return nums
    dp = [1] * l
    nums.sort()
    maxlen = 1
    maxval = dp[0]
    for i in range(1,l):
        for j in range(i):
            if nums[i] % nums[j] == 0:
                dp[i] = max(dp[i],dp[j]+1)
        if maxlen < dp[i]:
            maxlen = dp[i]
            maxval = nums[i]

    res = []
    if maxlen == 1:
        res.append(nums[0])
    else:
        for i in range(l-1, -1, -1):
            if maxlen <= 0:
                break
            if maxval % nums[i] == 0 and dp[i] == maxlen:
                res.append(nums[i])
                maxval = nums[i]
                maxlen -= 1
        res.sort()
    return res

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def increasingBST(self, root: TreeNode) -> TreeNode:
    def bstdef(treeNode):
        if not treeNode:
            return
        bstdef(treeNode.left)
        res.append(treeNode.val)
        bstdef(treeNode.right)
    res = []
    bstdef(root)

    resNode = TreeNode('')
    cutNode = resNode
    for i in res:
        cutNode.right = TreeNode(i)
        cutNode = cutNode.right

    return resNode.right

def merge(intervals):
    intervals.sort(key=lambda x : x[0])
    res = []
    curdata = intervals[0]
    res.append(curdata)
    for data in intervals[1:]:
        if curdata[1] < data[0]:
            curdata = data
        else:
            if curdata[1] <= data[1]:
                res.pop(-1)
                curdata = [curdata[0], data[1]]
            else:
                continue
        res.append(curdata)
    return res

def checkcount(weights, mid):
    daycount, curr = 1, 0
    for w in weights:
        curr += w
        if curr > mid:
            daycount += 1
            curr = w
    return daycount

def shipWithinDays(weights, D):
    left, right = max(weights), sum(weights)
    while left < right:
        mid = (left+right)//2
        if checkcount(weights, mid) > D:
            left = mid + 1
        else:
            right = mid
    return left

if __name__ == '__main__':
    # nums = [633,606,592,684,54,149,608,300,135,152,667,953,750,70,578,121,906,656,908,379,254,345,189,642,748,585,192,811,851,483,949,89,540,166,494,40,125,794,526,276,812,830,26,233,407,498,139,62,757,869,101,57,308,200,993,852,362,844,334,311,326,774,850,492,620,890,968,765,767,244,576,597,621,809,3,118,299,417,874,519,83,327,391,878,568,594,240,763,927,902,53,751,932,672,992,899,436,111,363,707,114,523,709,583,173,692,560,487,619,950,716,538,895,307,301,208,741,225,959,248,302,922,35,412,768,272,179,168,797,655,976,840,214,814,458,515,529,347,409,836,647,582,43,387,158,353,410,406,440,418,803,888,813,66,202,609,72,448,286,342,257,871,603,561,58,602,100,340,651,453,102,56,459,785,848,876,939,388,115,973,552,532,527,160,604,55,241,397,567,392,170,952,676,123,445,127,462,579,563,503,389,702,617,285,442,731,610,263,136,505,866,542,815,106,290,382,497,903,801,935,25,486,44,49,381,747,600,997,384,41,727,34,989,832,206,373,352,663,85,987,960,857,556,918,849,261,249,641,995,449,637,730,842,364,74,875,704,905,764,910,630,467,572,292,565,42,421,253,690,901,951,701,591,47,198,580,777,39,295,265,998,380,259,88,847,183,913,639,68,891,256,343,156,59,2,90,454,581,218,493,227,419,109,229,489,835,316,335,369,46,693,760,317,546,868,11,957,280,860,64,607,438,834,715,13,63,203,199,889,128,820,490,36,798,428,724,185,31,159,446,831,16,694,386,775,626,133,332,721,403,172,599,648,524,879,554,92,612,670,95,243,500,110,288,885,675,863,807,964,164,687,222,174,264,817,303,778,545,338,239,574,893,282,956,120,481,859,404,161,287,533,624,771,197,485,723,451,649,758,752,518,520,502,130,643,236,699,211,408,423,466,215,753,886,934,734,525,94,736,623,749,786,833,76,783,275,668,661,841,420,788,443,14,355,625,314,826,184,805,284,943,32,18,224,220,559,441,887,571,658,358,689,383,163,394,60,933,892,262,140,50,165,719,376,330,838,827,1000,588,679,182,629,872,970,351,45,965,372,547,589,116,898,278,117,251,190,194,6,511,104,530,861,846,61,881,739,230,854,683,555,646,678,97,839,12,954,937,558,15,354,740,93,238,298,781,657,426,544,616,368,979,669,738,78,601,268,823,696,65,67,495,787,217,488,38,33,980,252,144,562,339,522,425,281,472,710,982,470,103,907,19,312,825,304,87,424,10,945,210,553,681,390,759,52,569,977,936,640,296,870,305,422,743,195,660,955,204,961,71,69,575,590,659,232,853,754,7,766,962,507,517,940,802,153,631,877,336,944,346,337,433,941,539,947,796,260,270,150,27,474,325,810,399,175,584,416,598,653,465,677,377,427]
    # nums = [3, 16, 32, 64, 72, 144, 288, 576]
    # print(largestDivisibleSubset(nums))
    weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print(shipWithinDays(weights, 5))