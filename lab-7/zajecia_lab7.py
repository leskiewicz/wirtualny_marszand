import numpy as np
import matplotlib.pyplot as plt
import math as m
import funkcje as f

def demodulatorASK(z):
    dask = []
    for i in range(N):
        t = i * ts
        dask.append(z[i] * A * m.sin(2 * m.pi * fn * t))
    plt.plot(dask)
    plt.show()
    c = calka1(dask)
    return dask, c


def calka1(x):
    p = []
    c = []
    s = 0
    licznik = 0
    h = 35 / 2
    for k in range(N):
        licznik += ts
        s += x[k]
        if licznik >= tb:
            s = 0
            licznik = 0
        p.append(s)

        if s > h:
            c.append(1)
        else:
            c.append(0)
    plt.plot(p)
    plt.show()
    plt.plot(c)
    plt.show()
    return c


def sygnal(string):
    n = 0
    sygnal = []
    TMP_TB = 0
    for k in range(N):
        TMP_TB = TMP_TB + ts
        if TMP_TB >= tb:
            n += 1
            TMP_TB = 0
        sygnal.append(string[n])
    return sygnal


def mod_apl(x):
    za = []
    for i in range(N):
        t = i * ts
        if x[i] == '0':
            za.append(A1 * (m.sin(2 * m.pi * fn * t)))
        elif x[i] == '1':
            za.append(A2 * (m.sin(2 * m.pi * fn * t)))
    # plt.plot(za)
    # plt.show()
    return za


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
    print('S =', S)

    if S:
        c[S - 1] = int(not (c[S - 1]))
        return c, 'tak'
    else:
        return c, 'nie'


def sygnal(string):
    n = 0
    sygnal = []
    TMP_TB = 0
    for k in range(N):
        TMP_TB = TMP_TB + ts
        if TMP_TB >= tb:
            n += 1
            TMP_TB = 0
        sygnal.append(string[n])
    return sygnal

def konwertuj(string):
    return ''.join(format(i, 'b') for i in bytearray(string, encoding='utf8'))


tc = 1  # czas trwania
fs = 1600  # częstotliwość próbkowania
ts = 1 / fs  # okres próbkowania
N = tc * fs  # liczba próbek na cały sygnał

A = 1
A1 = 1
A2 = 2
W = 2

n = 15
k = 11
m = n - k

napis = ("11011010101")
napis=konwertuj(napis)
# napis = [int(i) for i in napis]

kod, P = koder15_11(napis)


B = len(kod)
tb = tc / B  # czas trwania pojedynczego bitu
fn = W * tb ** (-1)  # częstotliwość nośna

apl = mod_apl(kod)
print(apl)

# demask, c = demodulatorASK(apl)
# dekoder15_11(demask,P)