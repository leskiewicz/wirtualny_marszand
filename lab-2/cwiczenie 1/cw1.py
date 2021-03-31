import math as m
import cmath as cm
import matplotlib.pyplot as plt
import numpy as np
import time


def dft(x):
    N = len(x)
    wyniki = []
    for k in range(N):
        szereg = complex(0)
        for n in range(N):
            szereg += x[n] * cm.exp(-2j * cm.pi * n * k / N)
        wyniki.append(szereg)
    return wyniki

tc = 1  # czas trwania
f = 200  # częstotliwość
fs = 900  # częstotliwość próbkowania
N = tc * fs  # liczba próbek na cały sygnał
ts = 1 / fs  # okres próbkowania
fi = 1
przebieg = []
sekundy = []

for n in range(N):
    t = n * ts
    x = m.sin(2 * m.pi * 230 * t)
    przebieg.append(x)
    sekundy.append(t)

