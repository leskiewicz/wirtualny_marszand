import numpy as np


def koder7_4(b):
    w = [None] * n
    w[0] = (b[0] + b[1] + b[3]) % 2
    w[1] = (b[0] + b[2] + b[3]) % 2
    w[2] = b[0]
    w[3] = (b[1] + b[2] + b[3]) % 2
    w[4] = b[1]
    w[5] = b[2]
    w[6] = b[3]
    return w


def dekoder7_4(b):
    x1p = (b[2] + b[4] + b[6]) % 2
    x2p = (b[2] + b[5] + b[6]) % 2
    x4p = (b[4] + b[5] + b[6]) % 2
    x1 = (b[0] + x1p) % 2
    x2 = (b[1] + x2p) % 2
    x4 = (b[3] + x4p) % 2
    S = x1 * 1 + x2 * 2 + x4 * 2 ** 2
    print('S =', S)

    if S:
        b[S - 1] = int(not (b[S - 1]))
        return b, 'tak'
    else:
        return b, 'nie'


def koder15_11(b):
    # print(b)
    I = np.identity(k)
    # TEST = np.matrix(
    #     [[0, 0, 0, 1], [0, 0, 1, 0], [0, 0, 1, 1], [0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, 0], [0, 1, 1, 1], [1, 0, 0, 0],
    #      [1, 0, 0, 1], [1, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 1, 0], [1, 1, 1, 1]])
    # P = []
    TEST=[]
    for i in range(n):
        print(i)

    P = np.matrix(
        [[0, 0, 1, 1], [0, 1, 0, 1], [0, 1, 1, 0], [0, 1, 1, 1], [1, 0, 0, 1], [1, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 0],
         [1, 1, 0, 1], [1, 1, 1, 0], [1, 1, 1, 1]])
    G=np.concatenate((P,I),axis=1)
    c=b*G
    return c
    # wiersze = [2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]
    # for i in range(m-1,-1,-1):
    #     print('\n')
    #     for j in wiersze:
    # print(TEST[j,i])
    # arr.append=TEST[j,i]

# n = 7
# k = 4
# m = n - k
# napis = ("1101")
# napis = [int(i) for i in napis]
#
# kod = koder7_4(napis)
# print(kod, '\n')
#
# dekod = dekoder7_4(kod)
# print('Błąd:', dekod[1], '\n')
#
# kod[4] = int(not (kod[4]))
# dekod = dekoder7_4(kod)
# print('Błąd:', dekod[1])

n = 15
k = 11
m = n - k
napis = ("11011010101")
napis = [int(i) for i in napis]

kod = koder15_11(napis)
print(kod, '\n')

# dekod = dekoder7_4(kod)
# print('Błąd:', dekod[1], '\n')
