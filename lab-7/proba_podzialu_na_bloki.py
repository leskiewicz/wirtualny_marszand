import numpy as np
import matplotlib.pyplot as plt
import math as m


def mod_apl(x):
    za = []
    for i in range(N):
        t = i * ts
        if x[i] == '0':
            za.append(A1 * (m.sin(2 * m.pi * fn * t)))
        elif x[i] == '1':
            za.append(A2 * (m.sin(2 * m.pi * fn * t)))
    return za


def demodulatorASK(z):
    dask = []
    for i in range(N):
        t = i * ts
        dask.append(z[i] * A * m.sin(2 * m.pi * fn * t))
    c, h = calka1(dask)
    return dask, c, h


def calka1(x):
    p = []
    s = 0
    licznik = 0
    for k in range(N):
        licznik += ts
        s += x[k]
        if licznik >= tb:
            s = 0
            licznik = 0
        p.append(s)

    h = np.amax(p) / 2
    c = []
    for k in p:
        if k > h:
            c.append(1)
        else:
            c.append(0)
    return c, h


def konwertuj(string):
    return ''.join(format(i, 'b') for i in bytearray(string, encoding='utf8'))


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


def ciag_bitow(tab, treshold):
    jedynki = 0
    zera = 0
    wynik = []
    TMP = 0
    for i in range(len(tab)):
        TMP = TMP + ts

        if TMP >= tb:

            if (jedynki / (jedynki + zera)) < treshold / 100:
                wynik.append(0)
            else:
                wynik.append(1)

            TMP = 0
            jedynki = 0
            zera = 0
        if tab[i] == 1:
            jedynki += 1
        else:
            zera += 1

    if (jedynki / (jedynki + zera)) > treshold / 100:
        wynik.append(1)
    else:
        wynik.append(0)
    return wynik


def koder7_4(b):
    w = [None] * 7
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
    wyjscie = []
    if S:
        b[S - 1] = int(not (b[S - 1]))
        return b, 'tak'
    else:
        return b, 'nie'


def podzialNaBloki(b):
    sections = len(b) / 4
    bloki = np.array_split(b, sections)
    return bloki


napis = '''lesialke'''
b = konwertuj(napis)
print([int(i) for i in b])

tc = 1  # czas trwania
B = len(b)
tb = tc / B  # czas trwania pojedynczego bitu
fs = 1000  # częstotliwość próbkowania
ts = 1 / fs  # okres próbkowania
N = tc * fs  # liczba próbek na cały sygnał

A = 1
A1 = 1
A2 = 2
W = 2
tb = tc / B  # czas trwania pojedynczego bitu
fn = W * tb ** (-1)  # częstotliwość nośna

b = [int(i) for i in b]
bloki = podzialNaBloki(b)

kod = []
for X in bloki:
    kod.append(koder7_4(X))

kod2=[]
for i in kod: kod2 += i
b = kod2
print(b)

sygnal = sygnal(b)
apl = mod_apl(sygnal)


demask, c, h = demodulatorASK(apl)
# c = ciag_bitow(c,1)
# print(c)