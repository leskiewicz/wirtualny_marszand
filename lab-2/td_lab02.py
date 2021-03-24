import math as m
import cmath as cm
import time
import numpy as np

def dft(x):
    wyniki = []
    N = len(x)
    szereg = 0
    for k in range(N):
        for n in range(N):
            szereg = szereg + x[n] * cm.exp(1j * ((2 * cm.pi * k * n) / N))
        wyniki.append(szereg)
    return wyniki
numer=0
for p in range(8,32):
    numer+=1
    x = []
    for i in range(2**p):
        x.append(i)

    start = time.perf_counter()
    dft(x)
    koniec = time.perf_counter()
    dft_time=koniec - start
    print('Czas DFT',numer,'wynosi', f"{dft_time:.10f}", 'sekund')
    # print('Czas wynosi',koniec-start,'sekund')

    start = time.perf_counter()
    np.fft.fft(x)
    koniec = time.perf_counter()
    fft_time=koniec - start
    print('Czas FFT',numer,'wynosi', f"{fft_time:.10f}", 'sekund')
    # print('Czas wynosi',koniec-start,'sekund')
    print('Różnica w czasach wynosi', dft_time-fft_time,'sekund')

# print(dft(x))
# print(np.fft.fft(x))
