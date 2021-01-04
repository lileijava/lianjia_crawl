file = open('D:/vvtoolbox-gui-series-0.4.3-win-64bit/tsvideo/decrypted/2.ts', 'rb')
file1 = open('D:/result.ts', 'rb')
total = dict()
section = file.read(188)
section1 = file1.read(188)
num = 0
while len(section) == 188:
    PID = (section[1] & 0x1f) << 8 | section[2]
    print(PID)
    bi = bin(section[1])
    if len(bi[2:]) < 8:
        bi = '0'*(8-len(bi[2:]))+bi[2:]
    print(bi)
    print(list(section))
    print(list(section1))
    if PID != 256:
        num += 1
        if num > 10:
            break
    for key in total.keys():
        if PID == key:
            total[key] = total[key] + 1
            break
    else:
        total[PID] = 1
    section = file.read(188)
    section1 = file1.read(188)
    lastpid = PID
print(total)
file.close()