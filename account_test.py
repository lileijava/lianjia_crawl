class Solution(object):
    def clumsy(self, N):
        """
        :type N: int
        :rtype: int
        """
        num = 1
        result = []
        tmp = 0
        for i in range(N,0,-1):
            if i == N:
                tmp = i
            else:
                if num%4 == 1:
                    tmp = 0 - i
                elif num%4 == 2:
                    tmp *= i
                elif num%4 == 3:
                    if tmp < 0:
                        tmp = -tmp // i
                        tmp = 0 - tmp
                    else:
                        tmp = tmp // i
                    result.append(tmp)
                    tmp = 0
                else:
                    result.append(i)
                    num = 0
                if i == 1:
                    result.append(tmp)
            num += 1
        return sum(result)
if __name__ == '__main__':
    ss = Solution()
    print(ss.clumsy(5))