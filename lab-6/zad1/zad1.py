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


n = 7
k = 4
m = n - k
napis = ("1101")
napis = [int(i) for i in napis]

kod = koder7_4(napis)
print(kod, '\n')

dekod,blad = dekoder7_4(kod)
print('Błąd:', blad, '\n')

kod[4] = int(not (kod[4]))
dekod,blad = dekoder7_4(kod)
print('Błąd:', blad, '\n')