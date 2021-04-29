import numpy as np
import math as m
import matplotlib.pyplot as plt


def demodulatorASK_PSK(z):
    dask = []
    for i in range(N):
        t = i * ts
        dask.append(z[i]*m.sin(2 * m.pi * fn * t))
    plt.plot(dask)
    plt.show()
    return dask

def calka(x):
    calka=0
    for i in range(int(tb),0):
        calka=calka+x[i]
    # a,b,n=0,tb,5
    # h = float(b-a)/n
    # result = 0
    # for i in range(n):
    #     result += x[(a + h/2.0) + i*h]
    # result *= h
    # return result

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
    plt.plot(za)
    plt.show()
    return za


def mod_fazy(x):
    zp = []
    for i in range(N):
        t = i * ts
        if x[i] == '0':
            zp.append(m.sin(2 * m.pi * fn * t))
        elif x[i] == '1':
            zp.append(m.sin(2 * m.pi * fn * t + m.pi))
    plt.plot(zp)
    plt.show()
    return zp


def mod_cz(x):
    zf = []
    for i in range(N):
        t = i * ts
        if x[i] == '0':
            zf.append(m.sin(2 * m.pi * fn1 * t))
        elif x[i] == '1':
            zf.append(m.sin(2 * m.pi * fn2 * t))
    plt.plot(zf)
    plt.show()
    return zf


def konwertuj(string):
    # return ''.join(format(ord(x), 'b') for x in string)
    return ''.join(format(i, 'b') for i in bytearray(string, encoding='utf8'))



napis = '''acdc'''
b = konwertuj(napis)

tc = 1  # czas trwania
B = len(b)
tb = tc / B  # czas trwania pojedynczego bitu
fs = 900  # częstotliwość próbkowania
ts = 1 / fs  # okres próbkowania
# N = tc*fs  # liczba próbek na cały sygnał
N = m.ceil(tc / ts)

A1 = 1
A2 = 2
W = 2
fn = W * tb ** (-1)  # częstotliwość nośna
fn1 = (W + 1) / tb
fn2 = (W + 2) / tb

sygnal = sygnal(b)
apl = mod_apl(sygnal)
demask = demodulatorASK_PSK(apl)
clk = calka(demask)
# fazy = mod_fazy(sygnal)
# cz = mod_cz(sygnal)