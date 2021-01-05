import operator

file = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/0.ts', 'rb')
file1 = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/decrypted/0.ts', 'rb')
file2 = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/video/0.ts', 'rb')
total = dict()
section = file.read(188)
section1 = file1.read(188)
section2 = file2.read(188)
num = 0
while len(section) == 188:
    # PID = (section[1] & 0x1f) << 8 | section[2]
    # print(PID)
    # bi = bin(section[1])
    # if len(bi[2:]) < 8:
    #     bi = '0'*(8-len(bi[2:]))+bi[2:]
    # print(bi)
    a = list(section2)
    b = list(section1)
    # print(a)
    # print(b)
    # print(list(section2))
    if not operator.eq(a, b):
        print(num)
        PID = (section[1] & 0x1f) << 8 | section[2]
        print(PID)
        print(a)
        print(b)
    # if num > 117 and PID == 256:
    #     break
    num+=1
    # PID = (section[1] & 0x1f) << 8 | section[2]
    # if PID == 256:
    #     print(PID)
    #     bi = bin(section[1])
    #     if len(bi[2:]) < 8:
    #         bi = '0'*(8-len(bi[2:]))+bi[2:]
    #     print(bi)
    #     print([hex(d) for d in section])
    #     print(list(section))
    #     print(list(section1))
    #     if bi[1:2] == '1':
    #         if num < 1:
    #             num += 1
    #         else:
    #             break

    section = file.read(188)
    section1 = file1.read(188)
    section2 = file2.read(188)
    # lastpid = PID
print(total)
file.close()