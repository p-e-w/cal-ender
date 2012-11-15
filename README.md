# cal-ender: Personal calendar reform
Version 0.0.3, last modified 2-Ples-2012 (November 13th, 2012)

> **Note:**
> 
> This is **not** a calendar *application*, a calendar *library*, a calendar *API*, a calendar *in "the cloud"*, a calendar *template*, or anything else directly related to computer technology for that matter.
> 
> This is a [*calendar*](http://en.wikipedia.org/wiki/Calendar), a system that helps humans track time, like its [Gregorian](http://en.wikipedia.org/wiki/Gregorian_calendar), [Maya](http://en.wikipedia.org/wiki/Maya_calendar), [Dreamspell](http://en.wikipedia.org/wiki/Dreamspell) and [Minguo](http://en.wikipedia.org/wiki/Minguo_calendar) counterparts.

## Overview
cal-ender is an alternative to the ubiquitous [Gregorian calendar](http://en.wikipedia.org/wiki/Gregorian_calendar), designed from the ground up to complement rather than replace it. It is closely aligned with the Gregorian and works alongside it while mitigating many of the Gregorian calendar's shortcomings – enabling you to make the switch without having to wait for [the rest of the world to do the same](http://en.wikipedia.org/wiki/Calendar_reform).

### Design goals
For the design of cal-ender's date arithmetic and alignment with the Gregorian calender, the following objectives were considered paramount, in order of importance (chosen by evaluating the presumed frequency of use of the operations involved):

1. Easy computation of weekday given a cal-ender date
2. Easy computation of Gregorian date given a cal-ender date
3. Easy computation of cal-ender date given a Gregorian date
4. Easy computation of date difference given two cal-ender dates

## Description
A cal-ender date is given by a day, a month and a year. Every Gregorian date is assigned exactly one cal-ender date, and vice versa. The Gregorian weekday naming scheme is retained in cal-ender and the weekday of a cal-ender date is taken to be that of its corresponding date in the Gregorian calendar.

A cal-ender year consists of 13 months. The first 12 months always consist of precisely 28 days, or four weeks, each. The 13th month has either 28 or 35 days, depending on the year. cal-ender can thus be classified as a [13 month](http://en.wikipedia.org/wiki/13-month_calendar), [leap week](http://en.wikipedia.org/wiki/Leap_week_calendar) calendar.

Every cal-ender year starts with the first Monday in Gregorian March, i.e. the first day of the first month of a cal-ender year always falls on a Gregorian date between March 1st and March 7th. Every cal-ender year thus ends with a Sunday. The length of the 13th month is adapted to bridge the years.

It follows that the weekday of a cal-ender date is independent of year and month. This makes cal-ender a doubly [perennial calendar](http://en.wikipedia.org/wiki/Perennial_calendar) both in terms of years and months.

There is a one-to-one mapping between Gregorian and cal-ender years. The year number of a cal-ender year is taken to be the year number of the Gregorian year that contains the cal-ender year's first day.

### Date format
Since the weekday in cal-ender is determined by the day number alone, the day number is the most important item in a cal-ender date. It is therefore written first, followed by the month name or number and the year number. No [ordinal indicators](http://en.wikipedia.org/wiki/Ordinal_indicator) are used for any part of the date, as these are highly language dependent.

Acceptable date formats in cal-ender include:
- DAY MONTH YEAR
- DAY-MONTH-YEAR
- DAY/MONTH/YEAR
- DAY#MONTH#YEAR (preferred format if month numbers are used rather than month names, to prevent confusion with Gregorian dates)

Weekdays for cal-ender dates are not normally specified explicitly, as they are trivially computable given the day number.

### Month names
The months of each year are numbered 1-13 and named the following:

1.  *E*
2.  *Li*
3.  *Ung*
4.  *Fras*
5.  *Gowas*
6.  *Tostol*
7.  *Saistim*
8.  *Mernam*
9.  *Daven*
10. *Ples*
11. *Jor*
12. *Nu*
13. *A*

These names were generated using [yould](http://web.archive.org/web/20110525122524/http://ygingras.net/yould), a [Markov chain](http://en.wikipedia.org/wiki/Markov_chain)-based model of pronouncability in several natural languages. *__Note:__ The yould website is offline as of 2012. yould can be downloaded [here](http://pypi.python.org/pypi/yould/0.3.5).*

The following command was used to generate 20 pronouncable words of length LENGTH:

`yould -m LENGTH -M LENGTH -n 20`

The (subjectively) most fitting word was chosen from the resulting list, or the process repeated if no fitting word was found. The names of some months were slightly modified from yould's output.

There are several design points behind this naming scheme:
- The number of letters in each month name correspond to the month's position in the year in an intuitive manner, facilitating memorization and transition to cal-ender. At the same time, the number of syllables is minimal (no month name has more than two syllables), allowing for quick pronunciation. The month names contain no silent letters, making their length unambiguous even when transmitted phonetically only.
- The month names are designed to be easy to pronounce for speakers of all major languages and to not have a meaning in any major language (unlike the Gregorian calendar; the name "October" indicates a connection with the number eight to speakers of [Romance languages](http://en.wikipedia.org/wiki/Romance_languages) – "octo" means eight in Latin – while October is actually the TENTH month in the Gregorian calendar; compare also "September", "November", "December"). They are therefore meant to be used internationally without modification.
- The month names contain no characters except those common to all languages that use the latin alphabet (unlike the Gregorian month names in some languages, e.g. "März" in German, "Février" in French).
- Each letter occurs as a first letter at most once, allowing for single-letter abbreviations (unlike in the Gregorian calendar, where "June" and "July" share the first TWO letters). The letters "I" "l" and "O", which may be confused with the digits "1" and "0" when printed in some typefaces, never occur as first letters.
- The names sound more distinct than e.g. "September" and "December", lessening confusion when transmitted over low-quality voice connections.

## Properties

### Prerequisites
This section aims to not only list but actually *derive* the key properties of the cal-ender system. The use of some formalism and arithmetic is therefore unavoidable. In particular, it is assumed that the reader is familiar with
- [Addition](http://en.wikipedia.org/wiki/Addition) and [multiplication](http://en.wikipedia.org/wiki/Multiplication) of integers, signified by the operators `+` and `*`, respectively
- The [modulo](http://en.wikipedia.org/wiki/Modulo_operation) or remainder operation on the integers, signified by the operator `%`
- The [absolute value](http://en.wikipedia.org/wiki/Absolute_value) of an integer `n`, signified by `|n|`
- Basic [functional notation](http://en.wikipedia.org/wiki/Function_(mathematics)) of the form `f(n) = …`
- Logical [conjunction](http://en.wikipedia.org/wiki/Logical_conjunction) and [disjunction](http://en.wikipedia.org/wiki/Logical_disjunction) ("and" and "or"), signified by the operators `&&` and `||`, respectively

### Year length
The variation in length of the 13th month (and thus the variation of the year length) can be determined as follows:
- The number of days in the year is by definition always divisible by 7.
- By definition, each year thus has an integer number of weeks.
- The theoretical maximum length of a year occurs when March 1st is a Monday in a year preceding a Gregorian [leap year](http://en.wikipedia.org/wiki/Leap_year) in which March 7th is a Monday. In this case, the year has 372 days.
- The theoretical minimum year length occurs when March 7th is a Monday in a year preceding a Gregorian [common year](http://en.wikipedia.org/wiki/Common_year) in which March 1st is a Monday. In this case, the year has 359 days.
- Therefore, the year length in days can be any integer multiple of 7 between 359 and 372, which leaves only 364 and 371 days. Thus, like the Gregorian calendar, cal-ender has only two possible year lengths.
- The 13th month thus has either 28 or 35 days, or either 4 or 5 weeks.

Since the Gregorian leap day is always at or very nearly at the end of the cal-ender year, the mapping between Gregorian and cal-ender dates *for most days* depends only on the date of the cal-ender new year, *not* on whether the underlying Gregorian year is a leap year or not.

### Gregorian date of 1#1
The day `s(y)` of the first Monday in March (1#1#y) of a year `y` can be determined from two factors:
- The day of 1#1 of the *previous* year (1#1#y-1)
- Whether `y` is a Gregorian leap year or not

The values of `s(y)` for all possible combinations of these two factors are captured in the following table:

<table>
    <tr>
        <th>s(y-1)</th>
        <th>Common year</th>
        <th>Leap year</th>
    </tr>
    <tr>
        <th>1</th>
        <td>7</td>
        <td>6</td>
    </tr>
    <tr>
        <th>2</th>
        <td>1</td>
        <td>7</td>
    </tr>
    <tr>
        <th>3</th>
        <td>2</td>
        <td>1</td>
    </tr>
    <tr>
        <th>4</th>
        <td>3</td>
        <td>2</td>
    </tr>
    <tr>
        <th>5</th>
        <td>4</td>
        <td>3</td>
    </tr>
    <tr>
        <th>6</th>
        <td>5</td>
        <td>4</td>
    </tr>
    <tr>
        <th>7</th>
        <td>6</td>
        <td>5</td>
    </tr>
</table>

This table can be expressed in closed form as follows:

`s(y) = 7 - (8 - s(y-1) + p(y)) % 7`

where `s(y)` is the day in March on which 1#1#y falls and `p(y)` is the *leap year function*

`p(y) = { 1: y is a leap year, 0: otherwise }`

which in the Gregorian calendar is equivalent to

`p(y) = { 1: (y % 4 = 0 and y % 100 ≠ 0) or y % 400 = 0, 0: otherwise }`

Given that `s(1583) = 4`, `s(y)` can be computed recursively for all years `y > 1583` using these formulae (note that 1583 is the [first full year for which the Gregorian calendar was used](http://en.wikipedia.org/wiki/Gregorian_calendar#Gregorian_reform)).

### cal-ender leap years
A leap year in cal-ender is one that has 371 days (or 53 weeks), as opposed to a common year of 364 days (52 weeks). From the above table it can be seen that this occurs in two cases:
- `s(y) = 1`
- `s(y) = 2` and `y+1` is a Gregorian leap year

Given knowledge of the Gregorian leap years (see the function `p(y)` above), cal-ender leap years are thus easy to identify. As a rule of thumb, they occur roughly every 5 or 6 years.

### Period of the cal-ender year cycle
The cal-ender year cycle is completely determined by the fluctuation of the date of the first Monday in March over the years. Since relative to the same day in the previous year, that date is determined by the length of the Gregorian year (either 365 or 366 days), and Gregorian year lengths are periodic with a period of 400 years (see the function `p(y)` above), it follows that the cal-ender year cycle is also periodic with the same period of 400 years.

## Working with cal-ender dates

### Determining the weekday
By design, the most common calendar operation is the easiest in cal-ender: The weekday of a cal-ender date d#m#y is just

`d % 7`

where `0` = Sunday, `1` = Monday, `2` = Tuesday, `3` = Wednesday, `4` = Thursday, `5` = Friday, `6` = Saturday. *Note that the weekday is independent of month and year.* This is because every year starts with a Monday and every month has an integer number of weeks.

### Determining date difference
Calculating how many days lie between two dates is another fairly common operation that for many practical cases is greatly simplified in cal-ender when compared to the Gregorian calendar, owing to cal-ender's uniform month structure.

The number of days between two dates d1#m1#y1 and d2#m2#y2 is

`|d1-d2| + 28 * |m1-m2| + 364 * |y1-y2| + 7 * p`

where `p` is the number of cal-ender leap years between the dates. If both dates lie in the same year, this formula simplifies to

`|d1-d2| + 28 * |m1-m2|`

With some practice, this calculation can be performed mentally in mere seconds.

### cal-ender / Gregorian conversion
While the theory is straightforward, converstion between arbitrary cal-ender and Gregorian dates is a difficult task to accomplish mentally. To make it less daunting, two concepts are helpful:
- The *cal-ender day number* `n` of a date d#m#y which is defined as
  
  `n(d#m#y) = d + 28(m-1)`
  
  and is simply equivalent to the index of the day in the cal-ender year
- The *shifted cal-ender day number* `n'`:
  `n'(d#m#y) = n(d#m#y) + s(y)`

Because `s(y)` is the number of days by which the start of the cal-ender year `y` is shifted after the last day of February, *the Gregorian date of a cal-ender date d#m#y with shifted day number `n'` is independent of `y`* and can be looked up in the following table:

<table>
    <tr>
        <th>Gregorian date</th>
        <th>n'</th>
    </tr>
    <tr>
        <td>March 1st</td>
        <td>2</td>
    </tr>
    <tr>
        <td>April 1st</td>
        <td>33</td>
    </tr>
    <tr>
        <td>May 1st</td>
        <td>63</td>
    </tr>
    <tr>
        <td>June 1st</td>
        <td>94</td>
    </tr>
    <tr>
        <td>July 1st</td>
        <td>124</td>
    </tr>
    <tr>
        <td>August 1st</td>
        <td>155</td>
    </tr>
    <tr>
        <td>September 1st</td>
        <td>186</td>
    </tr>
    <tr>
        <td>October 1st</td>
        <td>216</td>
    </tr>
    <tr>
        <td>November 1st</td>
        <td>247</td>
    </tr>
    <tr>
        <td>December 1st</td>
        <td>277</td>
    </tr>
    <tr>
        <td>January 1st (y+1)</td>
        <td>307</td>
    </tr>
    <tr>
        <td>February 1st (y+1)</td>
        <td>338</td>
    </tr>
</table>

Having memorized this table (which never changes) as well as `s(y)` for the year in question (which has to be memorized only once anually if one is solely interested in the current year), one can convert from cal-ender to Gregorian dates and vice versa by interpolating appropriately. While this may take a while to master, it is very much within the reach of anybody possessing a basic grasp of arithmetic, and is certainly no more complex than [commonly used methods for mental weekday computation in the Gregorian calendar](http://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week).

Naturally, computers have no difficulty whatsoever performing this conversion, so if one is willing to rely on electronic help even these obstacles disappear entirely.

## Movable feasts
In the past centuries, the Gregorian calendar has [superseded many other calendars around the world](http://en.wikipedia.org/wiki/Gregorian_calendar#Adoption), a process that didn't always go smoothly. As a result, many cultures celebrate certain feasts on dates that are derived from an obsolete (often [lunisolar](http://en.wikipedia.org/wiki/Lunisolar_calendar)) calendar which aligns poorly with the Gregorian, making computation of the date of these festivities in a specific year an important and challenging problem that is transferred to cal-ender.

### Easter
[Many Christian holidays](http://en.wikipedia.org/wiki/Moveable_feast#Moveable_feasts_in_Christianity) (and, by consequence, some state holidays in predominantly Christian countries) are dependent on the date of [Easter](http://en.wikipedia.org/wiki/Easter) in terms of being celebrated a fixed number of days before or after Easter Sunday. The [computation of the date of Easter Sunday](http://en.wikipedia.org/wiki/Computus) is therefore of vital importance for many calendar applications.
Easter computation in the Gregorian calendar is notoriously complicated as highlighted by the fact that the period of the Gregorian Easter cycle is a dazzling 5.7 *million* years. While a large part of the complexity remains, Easter computation is simplified in cal-ender for two reasons:
- In a cal-ender year, Sundays (including Easter Sunday) can fall only on specific dates.
- Since the leap week in cal-ender is only inserted at the end of the year and Easter Sunday never falls into it, Easter computation in cal-ender can be performed independently of whether the running year is a cal-ender leap year or not.

#### Possible Easter dates in cal-ender
The dates on which Easter Sunday can fall may be determined as follows:
- In the Gregorian calendar, Easter always falls between March 22nd and April 25th.
- In cal-ender, March 22nd Gregorian always falls between 16#1 (if March 7th is a Monday) and 22#1 (if March 1st is a Monday). Similarly, April 25th Gregorian falls between 22#2 and 28#2.
- Therefore, Easter in cal-ender always falls on a Sunday between 16#1 and 28#2.
- Since cal-ender is perennial, this leaves as possible Easter dates: 21#1, 28#1, 7#2, 14#2, 21#2, 28#2.

cal-ender thus has only 6 possible Easter dates while the Gregorian calendar has 35. Numerical investigation additionally shows that 28#2 is very rare as an Easter date, occuring only 7 times per millenium on average. The full distribution of cal-ender Easter dates is as follows (sampled from the period 10,000 AD-110,000 AD):

<table>
    <tr>
        <th>Date</th>
        <th>Frequency</th>
    </tr>
    <tr>
        <td>21#1</td>
        <td>10.0 %</td>
    </tr>
    <tr>
        <td>28#1</td>
        <td>23.3 %</td>
    </tr>
    <tr>
        <td>7#2</td>
        <td>23.3 %</td>
    </tr>
    <tr>
        <td>14#2</td>
        <td>23.3 %</td>
    </tr>
    <tr>
        <td>21#2</td>
        <td>19.2 %</td>
    </tr>
    <tr>
        <td>28#2</td>
        <td>0.7 %</td>
    </tr>
</table>

#### cal-ender Easter computation
**TBD**

#### The cal-ender Easter cycle
**TBD**

### Diwali
**TBD**

### Eid
**TBD**

## cal-ender vs. the Gregorian calendar
The following is an informal, subjective comparison between cal-ender and the system it is designed to augment and replace.

### Similarities
- Year numbers of a date differ by at most 1

### Advantages of cal-ender
- Uniform month structure
- Closer and more predictable alignment of months with [lunar](http://en.wikipedia.org/wiki/Lunar_phase) and [menstrual cycles](http://en.wikipedia.org/wiki/Menstrual_cycle)
- Simpler Easter computation (see above)
- Leap years are less common
- More distinct month names
- Single-letter abbreviation of month names

### Advantages of the Gregorian calendar
- Familiarity and widespread adoption
- Better alignment with the [solar year](http://en.wikipedia.org/wiki/Tropical_year)
- Simpler leap year cycle

## License
Copyright © 2012 Philipp Emanuel Weidmann (pew@worldwidemann.com)

cal-ender is licensed under a [Creative Commons Attribution-ShareAlike license](http://creativecommons.org/licenses/by-sa/3.0/). In the event that a governmental organization or a regulatory body should choose to adopt the cal-ender specification as a standard, the author hereby pledges to release all intellectual property associated with it into the public domain.
