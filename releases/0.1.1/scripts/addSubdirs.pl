# perl addSubdirs.pl ../public/modules/ controllers

use strict;
use warnings;

print "foo" ;


if (scalar(@ARGV) < 2 ) {
    die " error: you must supply two arguments"
}
my $root = shift @ARGV;
print "root is" . $root;
chdir $root;

my @all_files = glob '*';

for my $dir (@all_files) {
    print $dir;
  if (-d $dir) {
    chdir $dir;
    print $dir . " is a directory\n";
    if (! -e $dir){
        mkdir $dir;
    }

    for my $newdir (@ARGV) {
        if (! -e $newdir) {
            mkdir $newdir;
        }
        my $globmatch = "*" . substr($newdir, 1, length($newdir)-2) . "*";
        my @matchingfiles = glob $globmatch;
        for my $file (@matchingfiles) {

            print $file, $newdir . "/" . $file;
        }

    }
    chdir "..";
  }
}

