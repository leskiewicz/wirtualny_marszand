import numpy as np

def koder15_11(b):
    I = np.identity(k)

    tab = []
    for i in range(16):
        liczba = (bin(i).replace("0b", ''))
        while len(liczba) < 4:
            liczba = '0' + liczba
        tab.append(liczba)

    tab2 = []
    for i in tab:
        tab2.append([int(j) for j in i])
    tab2 = np.resize(tab2, (16, 4))
    tab2 = np.delete(tab2, 0, axis=0)
    P = np.fliplr(tab2)
    P = np.delete(P, [0, 1, 3, 7], axis=0)

    G = np.concatenate((P, I), axis=1)
    G = G.astype(int)

    c = np.dot(b, G) % 2
    return c, P


def dekoder15_11(c, P):
    I = np.identity(n - k)
    H = np.concatenate((I, P.T), axis=1)
    H = H.astype(int)
    s = np.dot(c, H.T) % 2
    S = s[0] + s[1] * 2 + s[2] * (2 ** 2) + s[3] * (2 ** 3)

    if S:
        c[S - 1] = int(not (c[S - 1]))
        return c, 'tak'
    else:
        return c, 'nie'


n = 15
k = 11
m = n - k
napis = ("11011010101")
napis = [int(i) for i in napis]

kod, P = koder15_11(napis)
print(kod, '\n')

dekod,blad = dekoder15_11(kod, P)
print(dekod,'\nBłąd:', blad)