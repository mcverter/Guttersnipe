#!/usr/bin/perl

use LWP::Simple;
use URI::Escape;
use Data::Dumper;
use strict;
use warnings;

my $where = "1328 Halsey Street, Brooklyn, NY, 11237";
my $addr = uri_escape($where);
my @result = get("http://rpc.geocoder.us/service/csv?address=$addr");
print Dumper \@result;
