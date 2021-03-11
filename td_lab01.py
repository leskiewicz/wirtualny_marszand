import math as m
import matplotlib.pyplot as plt

# ćwiczenie 1(wzór 1)
fmax=8000
fs=1000
pi= m.pi
f=3000

tc=1000
t=1

fi=1000
przebieg=[]

for t in range(t,tc):
    x=m.cos(2*pi*f*t+fi)*m.cos(2.5*pow(t,0.2)*pi)
    przebieg.append(x)

plt.plot(przebieg)
plt.show()

# ćwiczenie 2